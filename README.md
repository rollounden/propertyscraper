# UAE Property Lead Finder

A web application that helps real estate professionals quickly extract property owner details from UAE real estate portals.

## Features

- Property URL submission from major UAE portals (propertyfinder.ae, bayut.com, dubizzle.com)
- Integration with Make.com for data processing
- Real-time status updates
- Modern, responsive UI built with Next.js and Tailwind CSS

## Tech Stack

- Next.js 15 with TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Make.com webhook integration

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/rollounden/propertyscraper.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Make.com webhook URL:
```
MAKE_WEBHOOK_URL=your_webhook_url_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `/src/app/page.tsx` - Landing page
- `/src/app/dashboard/page.tsx` - Main dashboard with property search
- `/src/components/property-search-form.tsx` - Property URL submission form
- `/src/app/api/webhook/route.ts` - Webhook API endpoint

## Environment Variables

- `MAKE_WEBHOOK_URL`: Your Make.com webhook URL for processing property URLs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
