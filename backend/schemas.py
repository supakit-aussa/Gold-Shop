from pydantic import BaseModel

class GoldPriceSchema(BaseModel):
    buy: float
    sell: float

class ProductSchema(BaseModel):
    name: str
    purity: str
    weight: float
    making_charge: float

class SavingSchema(BaseModel):
    customer_name: str
    amount_paid: float
