'use client';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
} 

export default function ProductCard({products}) {
  return (
    <>
      {products.map((link) => {
        return (
          <Card key={link.name}>
            <h1>{link.name}</h1>
            <p className="hidden md:block">{link.vendor} - {link.companies}</p>
          </Card>
        );
      })}
    </>
  );
}