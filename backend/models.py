from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from .database import Base

class GoldPrice(Base):
    __tablename__ = "gold_price"
    id = Column(Integer, primary_key=True)
    buy = Column(Float)
    sell = Column(Float)

class GoldPriceHistory(Base):
    __tablename__ = "gold_price_history"
    id = Column(Integer, primary_key=True)
    buy = Column(Float)
    sell = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    purity = Column(String)
    weight = Column(Float)
    making_charge = Column(Float)

class GoldSaving(Base):
    __tablename__ = "gold_saving"
    id = Column(Integer, primary_key=True)
    customer_name = Column(String)
    amount_paid = Column(Float)
    gold_grams = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
