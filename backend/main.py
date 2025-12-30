from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from . import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---- GOLD PRICE ----
@app.get("/gold-price")
def get_gold_price(db: Session = Depends(get_db)):
    price = db.query(models.GoldPrice).first()
    if not price:
        price = models.GoldPrice(buy=33000, sell=32000)
        db.add(price)
        db.commit()
        db.refresh(price)
    return price

@app.post("/gold-price")
def update_gold_price(data: schemas.GoldPriceSchema, db: Session = Depends(get_db)):
    price = db.query(models.GoldPrice).first()
    if not price:
        price = models.GoldPrice(**data.dict())
        db.add(price)
    else:
        price.buy = data.buy
        price.sell = data.sell

    db.add(models.GoldPriceHistory(buy=data.buy, sell=data.sell))
    db.commit()
    return price

@app.get("/gold-price/history")
def history(db: Session = Depends(get_db)):
    return db.query(models.GoldPriceHistory).order_by(
        models.GoldPriceHistory.created_at
    ).all()

# ---- PRODUCTS ----
@app.get("/products")
def products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@app.post("/products")
def add_product(p: schemas.ProductSchema, db: Session = Depends(get_db)):
    product = models.Product(**p.dict())
    db.add(product)
    db.commit()
    return product

# ---- CALCULATOR ----
@app.get("/calculate")
def calculate(weight: float, db: Session = Depends(get_db)):
    price = db.query(models.GoldPrice).first()
    return {"estimated": round(weight * price.buy, 2)}

# ---- GOLD SAVING ----
@app.post("/saving")
def saving(s: schemas.SavingSchema, db: Session = Depends(get_db)):
    price = db.query(models.GoldPrice).first()
    grams = round(s.amount_paid / price.buy, 4)

    record = models.GoldSaving(
        customer_name=s.customer_name,
        amount_paid=s.amount_paid,
        gold_grams=grams
    )
    db.add(record)
    db.commit()
    return record

@app.get("/saving")
def saving_list(db: Session = Depends(get_db)):
    return db.query(models.GoldSaving).all()
