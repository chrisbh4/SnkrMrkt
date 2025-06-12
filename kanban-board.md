# Snkr Prod Deployment Kanban Board

## 🚀 Done
- ✅ Reviews MVP intergrated with new UI/UX v.2.5.0

## 🏃 In Progress
- 

## 📋 To Do
### High Priority
- 📌 Deploy application
- 📌 Create a Staging app for deployment testing
- 📌 Generate Test files
- 📌 Shoe Details Page Improvements
- API Optimization
  - Speed up API fetch for /Home page seeded shoes
  - Clear up backend api logs for /sneaks
  - Implement logic for shoes not matching StockX data
  - Update Add To Cart validation UI to match badge style
-  ShoeDetailsPage.js UI updated to match SneakersDetailsPage
-  Reviews Model updated to include shoe styleID as reference
-  Seed data shoes updated with real names

### UI/UX Improvements
- DB: shoe's table "styleID" added to a row for easier querying
- DB: shoes seeders (styleID)row updated to match stockX api for easier rendering
- Frontend: "home" button logged in route changed to "all-shoes" and button inner text changed to "Shoes" and logout home button is changed to "/"
- 🎨 Implement scroll animations
- 🎨 Create Shoes Feature Updates
  - Add Gender Shoe size dropdown
  - Update Home page to show men/women/youth sizes in cards
  - Implement Gender size logic on Details page
  - Remove Price calculator from ShoesDetailsPage.js
  - Show only current Price
  - Slide out cart: increase cart width
  - Profile (reviews): create a reviews section that fetchs all of the user's reviews and shoe data
  - (Maintance): delete unused/old UI files
### Integration Tasks
- 🔧 Integrate shoe data creation/editing with current website layout
- 🔧 Github Actions / Fly deployment actions
- 🔧 Create a Staging app for deployment testing
---
Last Updated: [Current Date]

==================================================================

APIs:
            1. Speed up API fetch for /Home page seeded shoes 
            2. Find a way to clear up backend api logs for /sneaks
1. "How can I integrate creating and editing shoe data with how my website is Currently laid out
2. UI (Advanced feats):
        1. Scroll animation??
3. Generate Test files 
4. Shoe Details: 
        - If shoe.name does not match/include the stockX data then render ShoeDetailsPage
                - OR just update the name seed data with the correct names from stockX
            - Add To Cart validation UI: update it to look similar to the badge
5. Create Shoes
        - Gender Shoe size drop down
        - Home page (shoe size): shoes both men/woman/youth in the card
        - Details page: Gender size logic
        - ShoesDetailsPage.js : remove Price calculator and only show current Price


