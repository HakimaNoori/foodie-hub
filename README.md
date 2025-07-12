# foodie-hub
Here’s a brief explanation of the EER (Enhanced Entity-Relationship) Diagram for the Foodie Hub project:

📌 Entity Overview:
Restaurant: Includes id, name, address. Each restaurant has multiple menu items.

MenuItem: Includes id, restaurant_id, name, price, available. Represents items offered by a restaurant.

Customer: Includes id, name, phone. Stores customer contact information (no login required).

Order: Includes id, customer_id, restaurant_id, status. Each order is linked to one customer and one restaurant.

🔗 Key Relationships:
One Restaurant can have many MenuItems.

One Customer can place multiple Orders.

Each Order can contain multiple OrderItems.

Each OrderItem references a single MenuItem.

📸 EER Deagram:
<img width="1422" height="1880" alt="Blank diagram (1)" src="https://github.com/user-attachments/assets/6bf257dc-fe0b-4009-b645-32638a4ae1d6" />



زخپ
