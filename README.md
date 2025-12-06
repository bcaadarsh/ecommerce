# Maa Kripa Pharma - B2B E-Commerce Platform

A modern, responsive e-commerce website for wholesale pharmacy business.

## 🌐 Live Website
**[View Live](https://bcaadarsh.github.io/ecommerce/)** (GitHub Pages)

## 📋 Features

### Core Features
- **Product Management** - Browse medicines, syrups, and OTC products
- **Shopping Cart** - Add/remove items with persistent storage
- **Product Categories** - Organized by type (tablets, syrups, OTC, personal care)
- **Search & Filter** - Find products by name, category, and brand
- **Bulk Ordering** - B2B discounts for wholesale quantities

### Authentication
- **OTP-based Login** - Secure phone number verification
- **Session Management** - User authentication with localStorage
- **Logout Functionality** - Secure session termination

### Feedback System
- **Customer Feedback Form** - Rate and review service
- **Multiple Categories** - Product, delivery, pricing, website feedback
- **Star Rating** - 1-5 star rating system
- **Data Storage** - Feedback stored securely

## 📁 Project Structure

```
ecommerce/
├── index.html              # Home page
├── static/
│   ├── style.css          # Global styling
│   ├── script.js          # Cart & product logic
│   └── images/            # Product images
├── templates/
│   ├── product.html       # All products page
│   ├── cart.html          # Shopping cart
│   ├── login.html         # Login & feedback
│   ├── about.html         # About page
│   └── track.html         # Order tracking
├── images/                # Website images
├── README.md              # Documentation
└── .gitignore            # Git ignore rules
```

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bcaadarsh/ecommerce.git
   cd ecommerce
   ```

2. **Open Locally**
   ```bash
   # Simply open index.html in a browser
   # Or use a local server:
   python -m http.server 8000
   ```

3. **Access**
   - Local: `http://localhost:8000`
   - Live: `https://bcaadarsh.github.io/ecommerce/`

## 💻 Technologies Used

- **Frontend**
  - HTML5
  - CSS3 (with CSS Grid & Flexbox)
  - Vanilla JavaScript (ES6+)

- **Storage**
  - localStorage - Cart and auth data
  - Client-side persistence

- **Deployment**
  - GitHub Pages
  - Git version control

## 📦 Products Database

**Categories:**
- Tablets & Capsules
- Syrups & Tonics
- OTC Products
- Pain Relief
- Glucose & ORS
- Candy Lozenges
- Personal Care
- Women's Care

**Sample Brands:**
- GPP, Axlade, Aristo, Glenmark, Danish
- Abbott, Alkem, Mankind, Cipla, and more

## 🔐 Features Explained

### OTP Authentication
- Enter 10-digit phone number
- Receive 6-digit OTP (demo: shown in UI)
- Verify OTP to log in
- Session persists with localStorage
- 5-minute OTP expiry timer

### Cart System
- Add/remove items
- Adjust quantities
- Real-time price calculation
- Cart badge shows item count
- Cart persists across sessions

### Feedback Collection
- Name & email verification
- Feedback categories
- Star rating system
- Message submission
- All feedback stored locally

## 👨‍💼 Business Information

**Company:** Maa Kripa Pharma  
**Proprietor:** Khushilal Sahu  
**Address:** Near Hero Showroom, Narmadapuram  
**Contact:** 9407150830  
**Email:** maakripapharma2023@gmail.com  

**Licenses:**
- DL No.: (To be added)
- GST No.: (To be added)

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🔗 How to Deploy on GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository settings
   - Under "Pages", select "main" branch
   - Save

2. **Access Your Site**
   - URL: `https://[username].github.io/ecommerce/`
   - Example: `https://bcaadarsh.github.io/ecommerce/`

3. **Update Links** (if needed)
   - All links are relative paths
   - Works automatically on GitHub Pages

## 🐛 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Development Notes

### Adding New Products
- Edit `static/script.js`
- Add product object to `ALL_PRODUCTS` array
- Include: id, name, pack, mrp, price, brand, category, desc

### Customizing Colors
- Edit CSS variables in `static/style.css`
- Change `--primary`, `--accent-*` colors
- Update gradients for pills and cards

### Modifying Categories
- Update filter options in `templates/product.html`
- Add corresponding category in `static/script.js`

## 🔄 Git Workflow

```bash
# Add changes
git add .

# Commit with message
git commit -m "Add feature or fix bug"

# Push to GitHub
git push origin main
```

## 📄 License

This project is part of Maa Kripa Pharma's digital transformation initiative.

## 🤝 Support

For issues, feature requests, or questions:
- Contact: 9407150830
- Email: maakripapharma2023@gmail.com

---

**Last Updated:** December 6, 2025  
**Status:** Active & Maintained
