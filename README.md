# Fresh Farm E-commerce Platform 🌾

A modern e-commerce platform for fresh produce and groceries, built with React and TypeScript. This project implements core Human-Computer Interaction (HCI) principles to create an intuitive and user-friendly shopping experience.

## 🌟 Live Demo
[Live Demo Link](https://grocery-hci-app.vercel.app/)

## 🎯 Key Features

- 🛒 Intuitive shopping cart and wishlist
- 🌙 Dark/Light theme support
- 🔍 Smart search with filters
- 📱 Responsive design for all devices
- 🎮 First-time user onboarding
- 💳 Secure checkout process
- 📦 Order tracking
- 💡 Contextual help system

## 🏗 Project Structure

```
fresh-farm/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header/        # Navigation and search
│   │   ├── Cart/         # Shopping cart components
│   │   └── Product/      # Product-related components
│   ├── pages/            # Route-specific pages
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   └── styles/           # Global styles and themes
├── docs/                 # Documentation
│   ├── HCI_PRINCIPLES.md
│   └── END_SEMESTER_REPORT.md
├── public/              # Static assets
└── tests/               # Test files
```

## 🧠 HCI Principles Implementation

### 1. Shneiderman's 8 Golden Rules
- **Consistency**: Uniform design patterns across all pages
- **Universal Usability**: Accessible design for all users
- **Informative Feedback**: Toast notifications for user actions
- **Closure**: Clear confirmation for completed actions
- **Error Prevention**: Form validation and confirmation dialogs
- **Easy Reversal**: Undo options for user actions
- **Internal Control**: User-initiated actions
- **Memory Load**: Persistent cart and clear navigation

### 2. Core User Flow
```
Browse → Search/Filter → Product Details → Add to Cart → Checkout → Order Confirmation
```

### 3. Key Design Patterns
- **Progressive Disclosure**: Complex features revealed gradually
- **Visual Hierarchy**: Important elements emphasized
- **Gestalt Principles**: Logical grouping of related elements
- **Mental Models**: Familiar e-commerce patterns

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/your-username/fresh-farm.git
cd fresh-farm
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 🛠 Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router
- React Context
- React Hot Toast

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🎨 Theme Support

- Light/Dark mode toggle
- Consistent color scheme
- Accessible contrast ratios

## 🔒 Security Features

- Form validation
- Secure checkout process
- Data encryption
- Error handling

## 📚 Documentation

- [HCI Principles Implementation](./docs/HCI_PRINCIPLES.md)
- [End Semester Report](./docs/END_SEMESTER_REPORT.md)
- [Component Documentation](./docs/COMPONENTS.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [Praneeth Devarasetty] - Developer

## 📞 Contact

For questions or feedback, please reach out to [praneethdevarasetty31@gmail.com]