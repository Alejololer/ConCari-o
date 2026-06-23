import type { Product } from "@/lib/types";

// Catálogo real importado de los PDFs de campaña (San Valentín, Madres, Padre,
// Mujer, Navidad, Niño). Fallback sin Supabase y fuente para supabase/seed.sql.
// Ver handoff.md.
export const seedProducts: Product[] = [
  {
    "id": "amor-1",
    "name": "Super Promo",
    "price": 12.0,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "3 ramos de 3 fresas cada uno con tarjeta con dedicatoria.",
    "inc": [
      "3 ramos de 3 fresas",
      "Tarjeta con dedicatoria"
    ],
    "badge": "Super Promo",
    "active": true
  },
  {
    "id": "amor-2",
    "name": "Caja Especial Clásica",
    "price": 6.0,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "6 fresas con decoración tradicional.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "amor-3",
    "name": "El Ramo Perfecto",
    "price": 12.5,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "12 fresas cubiertas de chocolate en presentación de lujo.",
    "inc": [
      "Envoltura en papel coreano",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "amor-4",
    "name": "Fresas Deluxe",
    "price": 9.5,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "Box con 6 fresas decoradas con diseño especial.",
    "inc": [
      "Diseño especial",
      "Tarjeta con mensaje"
    ],
    "active": true
  },
  {
    "id": "amor-5",
    "name": "Box Caballeros",
    "price": 16.0,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "Gold collection de 12 fresas con diseño exclusivo en tonos dorados y oscuros.",
    "inc": [
      "Caja de lujo",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "amor-6",
    "name": "Happy Hour",
    "price": 12.5,
    "type": "boxes",
    "occ": [
      "amor"
    ],
    "desc": "Pack cervecero con 5 fresas decoradas y cerveza Corona.",
    "inc": [
      "5 fresas decoradas",
      "Cerveza Corona",
      "Caja",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "amor-7",
    "name": "Fresas Eternas",
    "price": 11.5,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "7 fresas decoradas más 1 rosa eterna.",
    "inc": [
      "7 fresas decoradas",
      "1 rosa eterna",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "amor-8",
    "name": "Fresas Perfectas",
    "price": 15.0,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "12 fresas con decoración clásica y toppings de corazón.",
    "inc": [
      "12 fresas",
      "Toppings de corazón",
      "Caja de regalo",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "amor-9",
    "name": "Balloon Bouquet",
    "price": 20.5,
    "type": "boxes",
    "occ": [
      "amor"
    ],
    "desc": "Arreglo de fresas decoradas más globo burbuja con confetti.",
    "inc": [
      "Fresas decoradas",
      "Globo burbuja con confetti",
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "amor-10",
    "name": "Fresas Personalizadas",
    "price": 19.5,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "9 fresas con chocolate y diseño a tu elección.",
    "inc": [
      "9 fresas",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "amor-11",
    "name": "Pink Collection",
    "price": 17.25,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "Fresas decoradas en tonos rosa con diseños tiernos.",
    "inc": [
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "amor-12",
    "name": "Box Triple Delicia",
    "price": 20.0,
    "type": "boxes",
    "occ": [
      "amor"
    ],
    "desc": "6 fresas con chocolate, 6 chocolates Ferrero Rocher y 6 rosas eternas.",
    "inc": [
      "6 fresas con chocolate",
      "6 chocolates Ferrero Rocher",
      "6 rosas eternas",
      "Caja decorada",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "amor-13",
    "name": "San Valentín Con Amor",
    "price": 25.0,
    "type": "boxes",
    "occ": [
      "amor"
    ],
    "desc": "Corazón eterno con rosas eternas y chocolates Ferrero Rocher.",
    "inc": [
      "Corazón eterno",
      "Rosas eternas",
      "Chocolates Ferrero Rocher",
      "Caja de corazón",
      "Tarjeta personalizada",
      "Mariposas doradas"
    ],
    "active": true
  },
  {
    "id": "amor-14",
    "name": "Corazón Dulce",
    "price": 28.5,
    "type": "boxes",
    "occ": [
      "amor"
    ],
    "desc": "Mix de fresas decoradas y chocolates Ferrero Rocher.",
    "inc": [
      "Fresas decoradas",
      "Chocolates Ferrero Rocher",
      "Caja corazón decorada",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "amor-15",
    "name": "Regalame Una Sonrisa",
    "price": 20.0,
    "type": "fresas",
    "occ": [
      "amor"
    ],
    "desc": "Surtido de fresas con chocolate negro y chocolate con leche con toppings de coco rallado.",
    "inc": [
      "Fresas con chocolate",
      "Toppings de coco rallado",
      "Caja",
      "Tarjeta decorativa"
    ],
    "active": true
  },
  {
    "id": "amor-16",
    "name": "Desayuno Clásico",
    "price": 16.5,
    "type": "desayunos",
    "occ": [
      "amor"
    ],
    "desc": "Sándwich de jamón y queso, jugo de naranja, café con leche, fruta picada y chocolate.",
    "inc": [
      "Sándwich de jamón y queso",
      "Jugo de naranja",
      "Café con leche",
      "Fruta picada",
      "Chocolate",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "amor-17",
    "name": "Desayuno Ideal",
    "price": 20.0,
    "type": "desayunos",
    "occ": [
      "amor"
    ],
    "desc": "Presentación especial en caja de madera con sándwich, fruta, jugo y chocolates Ferrero Rocher.",
    "inc": [
      "Sándwich",
      "Fruta",
      "Jugo",
      "Chocolates Ferrero Rocher",
      "Caja de madera",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "amor-18",
    "name": "Desayuno Premium",
    "price": 25.0,
    "type": "desayunos",
    "occ": [
      "amor"
    ],
    "desc": "El desayuno más completo con sándwich, café latte, jugo, fruta y 2 chocolates Kinder.",
    "inc": [
      "Sándwich",
      "Café latte",
      "Jugo",
      "Fruta",
      "2 chocolates Kinder",
      "Caja de madera decorada"
    ],
    "active": true
  },
  {
    "id": "mama-1",
    "name": "Super Promo Corporativo",
    "price": 3.0,
    "type": "fresas",
    "occ": [
      "mama"
    ],
    "desc": "3 fresas con tarjeta de dedicatoria.",
    "inc": [
      "3 fresas",
      "Tarjeta con dedicatoria"
    ],
    "badge": "Super Promo Corporativo",
    "active": true
  },
  {
    "id": "mama-2",
    "name": "Caja Especial Clásica",
    "price": 6.0,
    "type": "fresas",
    "occ": [
      "mama"
    ],
    "desc": "6 fresas con decoración tradicional.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mama-3",
    "name": "El Ramo Perfecto",
    "price": 18.0,
    "type": "fresas",
    "occ": [
      "mama"
    ],
    "desc": "8 fresas cubiertas de chocolate en presentación de lujo con hermosas rosas.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mama-4",
    "name": "Corazón De Mamá",
    "price": 19.5,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "Box con 9 fresas decoradas y rosas eternas.",
    "inc": [
      "9 fresas decoradas",
      "Rosas eternas",
      "Diseño especial",
      "Tarjeta con mensaje"
    ],
    "active": true
  },
  {
    "id": "mama-5",
    "name": "Mamá Especial",
    "price": 15.5,
    "type": "fresas",
    "occ": [
      "mama"
    ],
    "desc": "Gold collection de 6 fresas con diseño exclusivo en tonos pastel y rojos.",
    "inc": [
      "Caja de lujo",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mama-6",
    "name": "Para Ti Mamá Valiente",
    "price": 14.5,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "Combinación de fresas decoradas y rosas eternas.",
    "inc": [
      "Fresas decoradas",
      "Rosas eternas",
      "Caja",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mama-7",
    "name": "Amor Eterno De Mamá",
    "price": 20.0,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "Hermoso ramo de rosas eternas.",
    "inc": [
      "Rosas eternas",
      "Caja decorativa de corazón",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mama-8",
    "name": "Mamá Especial",
    "price": 6.0,
    "type": "fresas",
    "occ": [
      "mama"
    ],
    "desc": "4 fresas con decoración floral de encanto.",
    "inc": [
      "4 fresas",
      "Caja de regalo",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mama-9",
    "name": "Balloon Bouquet",
    "price": 25.0,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "Arreglo de fresas decoradas con globo burbuja con confetti.",
    "inc": [
      "Fresas decoradas",
      "Globo burbuja con confetti",
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mama-10",
    "name": "Fresas Personalizadas",
    "price": 19.5,
    "type": "fresas",
    "occ": [
      "mama"
    ],
    "desc": "9 fresas con chocolate y diseño a tu elección.",
    "inc": [
      "9 fresas",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "mama-11",
    "name": "Pink Collection",
    "price": 17.25,
    "type": "fresas",
    "occ": [
      "mama"
    ],
    "desc": "Fresas decoradas en tonos rosa con diseños tiernos.",
    "inc": [
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "mama-12",
    "name": "Box Triple Delicia",
    "price": 20.0,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "6 fresas con chocolate, 6 chocolates Ferrero Rocher y 6 rosas eternas.",
    "inc": [
      "6 fresas con chocolate",
      "6 chocolates Ferrero Rocher",
      "6 rosas eternas",
      "Caja decorada",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mama-13",
    "name": "San Valentín Con Amor",
    "price": 25.0,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "Corazón eterno con rosas eternas y chocolates Ferrero Rocher.",
    "inc": [
      "Corazón eterno",
      "Rosas eternas",
      "Chocolates Ferrero Rocher",
      "Caja de corazón",
      "Tarjeta personalizada",
      "Mariposas doradas"
    ],
    "active": true
  },
  {
    "id": "mama-14",
    "name": "Corazón Dulce De Mamá",
    "price": 25.0,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "Mix de fresas decoradas y chocolates Ferrero Rocher.",
    "inc": [
      "Fresas decoradas",
      "Chocolates Ferrero Rocher",
      "Caja corazón decorada",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mama-15",
    "name": "Regalame Una Sonrisa",
    "price": 25.0,
    "type": "boxes",
    "occ": [
      "mama"
    ],
    "desc": "Flores rojas eternas con chocolates Ferrero Rocher y crema de manos.",
    "inc": [
      "Flores rojas eternas",
      "Chocolates Ferrero Rocher",
      "Crema de manos",
      "Caja deluxe",
      "Tarjeta decorativa"
    ],
    "active": true
  },
  {
    "id": "mama-16",
    "name": "Desayuno Clásico",
    "price": 16.5,
    "type": "desayunos",
    "occ": [
      "mama"
    ],
    "desc": "Sándwich de jamón y queso, jugo de naranja, café con leche, fruta picada y chocolate.",
    "inc": [
      "Sándwich de jamón y queso",
      "Jugo de naranja",
      "Café con leche",
      "Fruta picada",
      "Chocolate",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mama-17",
    "name": "Desayuno Ideal",
    "price": 20.0,
    "type": "desayunos",
    "occ": [
      "mama"
    ],
    "desc": "Presentación especial en caja de madera con sándwich, fruta, jugo y chocolates Ferrero Rocher.",
    "inc": [
      "Sándwich",
      "Fruta",
      "Jugo",
      "Chocolates Ferrero Rocher",
      "Caja de madera",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mama-18",
    "name": "Desayuno Premium",
    "price": 25.0,
    "type": "desayunos",
    "occ": [
      "mama"
    ],
    "desc": "El desayuno más completo con sándwich, café latte, jugo, fruta, postre y 2 chocolates Kinder.",
    "inc": [
      "Sándwich",
      "Café latte",
      "Jugo",
      "Fruta",
      "Postre",
      "2 chocolates Kinder",
      "Caja de madera decorada"
    ],
    "active": true
  },
  {
    "id": "mama-19",
    "name": "Desayuno Favorito",
    "price": 14.5,
    "type": "desayunos",
    "occ": [
      "mama"
    ],
    "desc": "Sándwich de jamón y 2 quesos, jugo de naranja y fresas con chocolate de lujo.",
    "inc": [
      "Sándwich de jamón y 2 quesos",
      "Jugo de naranja",
      "Fresas con chocolate de lujo",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mama-20",
    "name": "Desayuno Ideal Para Mamá",
    "price": 15.5,
    "type": "desayunos",
    "occ": [
      "mama"
    ],
    "desc": "Presentación especial con sándwich, fruta, jugo de naranja, granola y yogurt.",
    "inc": [
      "Sándwich",
      "Fruta",
      "Jugo de naranja",
      "Granola",
      "Yogurt",
      "Caja especial",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mama-21",
    "name": "Desayuno Deluxe",
    "price": 28.0,
    "type": "desayunos",
    "occ": [
      "mama"
    ],
    "desc": "El desayuno más completo con café, jugo, fruta, postre, Nutella, granola y waffles.",
    "inc": [
      "Café",
      "Jugo",
      "Fruta",
      "Postre",
      "Nutella 140g",
      "Granola",
      "Waffles",
      "Caja de madera decorada"
    ],
    "active": true
  },
  {
    "id": "papa-1",
    "name": "Super Promo Papá Feliz",
    "price": 15.0,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "6 fresas con chocolate y 1 cerveza Modelo Premium.",
    "inc": [
      "6 fresas con chocolate",
      "1 cerveza Modelo Premium",
      "Caja decorada",
      "Tarjeta con mensaje personalizado"
    ],
    "badge": "Super Promo Papá Feliz",
    "active": true
  },
  {
    "id": "papa-2",
    "name": "Caja Especial Clásica",
    "price": 11.5,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "6 fresas con decoración tradicional y chocolates Ferrero.",
    "inc": [
      "6 fresas",
      "Chocolates Ferrero",
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "papa-3",
    "name": "El Combinación Perfecta",
    "price": 28.0,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "8 fresas cubiertas de chocolate, chocolates Ferrero y 2 cervezas Modelo Premium.",
    "inc": [
      "8 fresas",
      "Chocolates Ferrero",
      "2 cervezas Modelo Premium",
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "papa-4",
    "name": "Caja Amor De Papá",
    "price": 25.0,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "Box con 2 cervezas Corona, papas Pringles, chocolate Hershey y snacks variados.",
    "inc": [
      "2 cervezas Corona",
      "Papas Pringles",
      "Chocolate Hershey",
      "3 snacks variados",
      "Diseño especial",
      "Tarjeta con mensaje"
    ],
    "active": true
  },
  {
    "id": "papa-5",
    "name": "Papá Especial",
    "price": 18.0,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "Gold collection de 10 fresas con diseño elegante y 1 cerveza Corona.",
    "inc": [
      "10 fresas",
      "1 cerveza Corona",
      "Caja",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "papa-6",
    "name": "Para Ti Papá Valiente",
    "price": 13.5,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "Combinación de fresas decoradas y cerveza Corona.",
    "inc": [
      "Fresas decoradas",
      "Cerveza Corona",
      "Caja",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "papa-7",
    "name": "Amor Eterno De Papá",
    "price": 20.0,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "Coca Cola, papas Pringles, 2 cervezas Corona y chocolates Ferrero.",
    "inc": [
      "Coca Cola",
      "Papas Pringles",
      "2 cervezas Corona",
      "Chocolates Ferrero",
      "Caja decorativa de corazón",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "papa-8",
    "name": "Papá Especial",
    "price": 20.0,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "2 cervezas, caja de chocolates Ferrero y papas Pringles.",
    "inc": [
      "2 cervezas",
      "Chocolates Ferrero",
      "Papas Pringles",
      "Caja de regalo",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "papa-9",
    "name": "Especialmente Para Ti",
    "price": 10.0,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "Cerveza Corona, gomitas y 2 chocolates Ferrero.",
    "inc": [
      "Cerveza Corona",
      "Gomitas",
      "2 chocolates Ferrero",
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "papa-10",
    "name": "Fresas Para Papá",
    "price": 12.5,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "4 fresas con chocolate y diseño especial más una cerveza.",
    "inc": [
      "4 fresas",
      "1 cerveza",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "papa-11",
    "name": "Box Collection",
    "price": 12.5,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "Fresas decoradas edición premium con cerveza Corona.",
    "inc": [
      "Fresas decoradas",
      "Cerveza Corona",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "papa-12",
    "name": "Edición Papá Amore",
    "price": 12.5,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "3 fresas con chocolate y cerveza Corona.",
    "inc": [
      "3 fresas",
      "Cerveza Corona",
      "Caja decorada",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "papa-13",
    "name": "Fresas Dragon Ball",
    "price": 19.0,
    "type": "fresas",
    "occ": [
      "papa"
    ],
    "desc": "10 fresas con chocolate y diseño especial de Dragon Ball.",
    "inc": [
      "10 fresas",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "papa-14",
    "name": "Fresas Naruto",
    "price": 15.5,
    "type": "fresas",
    "occ": [
      "papa"
    ],
    "desc": "Fresas decoradas edición premium de Naruto.",
    "inc": [
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "papa-15",
    "name": "Desayuno Clásico",
    "price": 16.5,
    "type": "desayunos",
    "occ": [
      "papa"
    ],
    "desc": "Sándwich de jamón y queso, jugo de naranja, café con leche, fruta picada y chocolate.",
    "inc": [
      "Sándwich de jamón y queso",
      "Jugo de naranja",
      "Café con leche",
      "Fruta picada",
      "Chocolate",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "papa-16",
    "name": "Desayuno Ideal",
    "price": 15.5,
    "type": "desayunos",
    "occ": [
      "papa"
    ],
    "desc": "Presentación especial en caja de madera con sándwich, fruta, jugo y chocolates Ferrero Rocher.",
    "inc": [
      "Sándwich",
      "Fruta",
      "Jugo",
      "Chocolates Ferrero Rocher",
      "Caja de madera",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "papa-17",
    "name": "Desayuno Premium",
    "price": 23.0,
    "type": "desayunos",
    "occ": [
      "papa"
    ],
    "desc": "El desayuno más completo con sándwich, café latte, jugo, fruta, postre y 2 chocolates Kinder.",
    "inc": [
      "Sándwich",
      "Café latte",
      "Jugo",
      "Fruta",
      "Postre",
      "2 chocolates Kinder",
      "Caja de madera decorada"
    ],
    "active": true
  },
  {
    "id": "papa-18",
    "name": "Desayuno Favorito",
    "price": 14.5,
    "type": "desayunos",
    "occ": [
      "papa"
    ],
    "desc": "Sándwich de jamón y 2 quesos, jugo de naranja y fresas con chocolate de lujo.",
    "inc": [
      "Sándwich de jamón y 2 quesos",
      "Jugo de naranja",
      "Fresas con chocolate de lujo",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "papa-19",
    "name": "Desayuno Ideal Para Papá",
    "price": 15.5,
    "type": "desayunos",
    "occ": [
      "papa"
    ],
    "desc": "Presentación especial con sándwich, fruta, jugo de naranja, granola y yogurt.",
    "inc": [
      "Sándwich",
      "Fruta",
      "Jugo de naranja",
      "Granola",
      "Yogurt",
      "Caja especial",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mujer-1",
    "name": "Mujer Hermosa",
    "price": 7.0,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "6 fresas con decoración especial para el día de la mujer",
    "inc": [
      "6 fresas con decoración especial",
      "Caja decorativa",
      "Tarjeta con dedicatoria"
    ],
    "active": true
  },
  {
    "id": "mujer-2",
    "name": "Caja Especial Clásica",
    "price": 6.0,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "6 fresas con decoración tradicional",
    "inc": [
      "6 fresas con decoración tradicional",
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mujer-3",
    "name": "Detalle Ejecutivo",
    "price": 5.0,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "Fresas cubiertas de chocolate en presentación de lujo",
    "inc": [
      "Fresas cubiertas de chocolate",
      "Envase con tapa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mujer-4",
    "name": "Fresas Deluxe",
    "price": 15.5,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "Box de 8 fresas decoradas con diseño especial",
    "inc": [
      "8 fresas decoradas",
      "Caja corazón",
      "Tarjeta con mensaje"
    ],
    "active": true
  },
  {
    "id": "mujer-5",
    "name": "Box Damiselas",
    "price": 13.0,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "Gold collection de 12 fresas con diseño exclusivo",
    "inc": [
      "12 fresas con diseño exclusivo en tonos morados y oscuros",
      "Caja de lujo",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mujer-6",
    "name": "Mujer Valiente",
    "price": 15.5,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "9 fresas decoradas con diseños exclusivos para día de la mujer",
    "inc": [
      "9 fresas decoradas con diseños exclusivos",
      "Caja",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mujer-7",
    "name": "Fresas Eternas",
    "price": 11.5,
    "type": "boxes",
    "occ": [
      "mujer"
    ],
    "desc": "7 fresas decoradas más 1 rosa eterna",
    "inc": [
      "7 fresas decoradas",
      "1 rosa eterna",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mujer-8",
    "name": "Combinación Perfecta",
    "price": 11.0,
    "type": "boxes",
    "occ": [
      "mujer"
    ],
    "desc": "Rosas eternas y chocolates Ferrero",
    "inc": [
      "Rosas eternas",
      "Chocolates Ferrero",
      "Caja corazón",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mujer-9",
    "name": "Balloon Bouquet",
    "price": 20.5,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "Arreglo de fresas decoradas más globo burbuja con confetti",
    "inc": [
      "Fresas decoradas",
      "Globo burbuja con confetti",
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mujer-10",
    "name": "Fresas Personalizadas",
    "price": 19.5,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "9 fresas con diseño a elección en chocolate",
    "inc": [
      "9 fresas con diseño a elección",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "mujer-11",
    "name": "Pink Collection",
    "price": 17.25,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "Fresas decoradas en tonos rosa con diseños tiernos",
    "inc": [
      "Fresas decoradas en tonos rosa",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "mujer-12",
    "name": "Box Triple Delicia",
    "price": 20.0,
    "type": "boxes",
    "occ": [
      "mujer"
    ],
    "desc": "Combinación de fresas, chocolates Ferrero y rosas eternas",
    "inc": [
      "6 fresas con chocolate",
      "6 chocolates Ferrero Rocher",
      "6 rosas eternas",
      "Caja decorada",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mujer-13",
    "name": "San Valentín Con Amor",
    "price": 25.0,
    "type": "boxes",
    "occ": [
      "mujer"
    ],
    "desc": "Corazón eterno, rosas eternas y chocolates Ferrero",
    "inc": [
      "Corazón eterno",
      "Rosas eternas",
      "Chocolates Ferrero Rocher",
      "Caja de corazón",
      "Tarjeta personalizada",
      "Mariposas doradas"
    ],
    "active": true
  },
  {
    "id": "mujer-14",
    "name": "Corazón Dulce",
    "price": 28.5,
    "type": "boxes",
    "occ": [
      "mujer"
    ],
    "desc": "Mix de fresas decoradas y chocolates Ferrero",
    "inc": [
      "Fresas decoradas",
      "Chocolates Ferrero Rocher",
      "Caja corazón decorada",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mujer-15",
    "name": "Regalame Una Sonrisa",
    "price": 19.0,
    "type": "fresas",
    "occ": [
      "mujer"
    ],
    "desc": "Surtido de fresas con chocolate negro y blanco con toppings de coco",
    "inc": [
      "Fresas con chocolate negro y blanco",
      "Toppings de coco",
      "Caja corazón",
      "Tarjeta decorativa"
    ],
    "active": true
  },
  {
    "id": "mujer-16",
    "name": "Desayuno Clásico",
    "price": 16.5,
    "type": "desayunos",
    "occ": [
      "mujer"
    ],
    "desc": "Sándwich, jugo, café con leche, fruta y chocolate",
    "inc": [
      "Sándwich de jamón y queso",
      "Jugo de naranja",
      "Café con leche",
      "Fruta picada",
      "Chocolate",
      "Caja decorativa",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "mujer-17",
    "name": "Desayuno Ideal",
    "price": 20.0,
    "type": "desayunos",
    "occ": [
      "mujer"
    ],
    "desc": "Presentación especial en caja de madera con chocolates Ferrero",
    "inc": [
      "Sándwich",
      "Fruta",
      "Jugo",
      "Chocolates Ferrero Rocher",
      "Caja de madera",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "mujer-18",
    "name": "Desayuno Premium",
    "price": 25.0,
    "type": "desayunos",
    "occ": [
      "mujer"
    ],
    "desc": "El desayuno más completo con café latte, sándwich y chocolates Kinder",
    "inc": [
      "Sándwich",
      "Café latte (frío/caliente)",
      "Jugo",
      "Fruta",
      "2 chocolates Kinder",
      "Caja de madera decorada"
    ],
    "active": true
  },
  {
    "id": "navidad-1",
    "name": "Bombs 1",
    "price": 2.25,
    "type": "fresas",
    "occ": [
      "navidad"
    ],
    "desc": "Chocolate con malvaviscos, decoración navideña",
    "inc": [
      "Chocolate con malvaviscos",
      "Caja individual"
    ],
    "active": true
  },
  {
    "id": "navidad-2",
    "name": "Bombs 2",
    "price": 8.5,
    "type": "fresas",
    "occ": [
      "navidad"
    ],
    "desc": "Chocolate con malvaviscos, decoración navideña en caja",
    "inc": [
      "Chocolates con malvaviscos",
      "Caja de 4 o 6 unidades disponibles"
    ],
    "active": true
  },
  {
    "id": "navidad-3",
    "name": "Choco Hershey",
    "price": 11.0,
    "type": "fresas",
    "occ": [
      "navidad"
    ],
    "desc": "Fresas con chocolate Hershey en caja navideña",
    "inc": [
      "Fresas con chocolate Hershey",
      "Caja de 4 o 6 unidades disponibles"
    ],
    "active": true
  },
  {
    "id": "navidad-4",
    "name": "Fresas Con Decoración Navideña",
    "price": 3.5,
    "type": "fresas",
    "occ": [
      "navidad"
    ],
    "desc": "Fresas cubiertas de chocolate con toppings navideños",
    "inc": [
      "Fresas con chocolate",
      "Decoración navideña",
      "Disponible en caja de 3, 6, 9 o 15 unidades"
    ],
    "active": true
  },
  {
    "id": "navidad-5",
    "name": "Choco Oreo",
    "price": 11.0,
    "type": "fresas",
    "occ": [
      "navidad"
    ],
    "desc": "Fresas rellenas de cacao y galleta Oreo",
    "inc": [
      "Fresas rellenas de cacao",
      "Galleta Oreo integrada",
      "Caja de 4 o 6 unidades disponibles"
    ],
    "active": true
  },
  {
    "id": "navidad-6",
    "name": "Choco Fresa",
    "price": 11.0,
    "type": "fresas",
    "occ": [
      "navidad"
    ],
    "desc": "Fresas rellenas de chocofresa",
    "inc": [
      "Fresas rellenas de chocofresa",
      "Caja de 4 o 6 unidades disponibles"
    ],
    "active": true
  },
  {
    "id": "navidad-7",
    "name": "Love Happy",
    "price": 12.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "3 chocobombas con taza de regalo",
    "inc": [
      "3 chocobombas",
      "Taza decorativa navideña",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "navidad-8",
    "name": "Love Happy 2",
    "price": 6.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "1 chocobomba en taza con malvaviscos",
    "inc": [
      "1 chocobomba",
      "Taza decorativa",
      "Malvaviscos"
    ],
    "active": true
  },
  {
    "id": "navidad-9",
    "name": "Love Happy 3",
    "price": 16.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "3 fresas y 2 chocobombas en jarro decorativo",
    "inc": [
      "3 fresas con chocolate",
      "2 chocobombas",
      "Jarro decorativo navideño"
    ],
    "active": true
  },
  {
    "id": "navidad-10",
    "name": "Ideal Choc",
    "price": 17.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "5 chocobombas y 4 fresas con chocolate",
    "inc": [
      "5 chocobombas",
      "4 fresas con chocolate",
      "Caja decorada navideña"
    ],
    "active": true
  },
  {
    "id": "navidad-11",
    "name": "Dulce Navidad",
    "price": 30.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "12 fresas con chocolate y botella de vino",
    "inc": [
      "12 fresas con chocolate",
      "Botella de vino tinto",
      "Caja de regalo decorada"
    ],
    "active": true
  },
  {
    "id": "navidad-12",
    "name": "Perfect",
    "price": 30.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "2 cervezas, 8 fresas y 8 chocolates Ferrero",
    "inc": [
      "2 cervezas",
      "8 fresas con chocolate",
      "8 chocolates Ferrero Rocher",
      "Caja de regalo premium"
    ],
    "active": true
  },
  {
    "id": "navidad-13",
    "name": "Pink Rose",
    "price": 30.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "10 fresas, botella de vino rosado y rosas decorativas",
    "inc": [
      "10 fresas con chocolate",
      "Botella de vino rosado",
      "Rosas decorativas",
      "Caja corazón"
    ],
    "active": true
  },
  {
    "id": "navidad-14",
    "name": "Love Happy",
    "price": 20.0,
    "type": "fresas",
    "occ": [
      "navidad"
    ],
    "desc": "Fresas con chocolate y decoración navideña especial",
    "inc": [
      "Fresas con chocolate",
      "Decoración navideña con mariposas doradas",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "navidad-15",
    "name": "Love",
    "price": 28.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "Vino, caja de Ferrero y mix de frutos secos",
    "inc": [
      "Botella de vino tinto",
      "Caja Ferrero Rocher",
      "Mix de frutos secos",
      "Caja decorada"
    ],
    "active": true
  },
  {
    "id": "navidad-16",
    "name": "Christmas Star's",
    "price": 35.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "Vino, frutos secos, chocolates y caja tipo estrella",
    "inc": [
      "Botella de vino",
      "Mix de frutos secos",
      "Chocolates variados",
      "Caja tipo estrella dorada"
    ],
    "active": true
  },
  {
    "id": "navidad-17",
    "name": "Perfect Christmas",
    "price": 38.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "Vino, frutos secos, chocolates y aceitunas gourmet",
    "inc": [
      "Botella de vino",
      "Mix de frutos secos",
      "Chocolates variados",
      "Aceitunas gourmet",
      "Caja decorada premium"
    ],
    "active": true
  },
  {
    "id": "navidad-18",
    "name": "Christmas Love",
    "price": 27.0,
    "type": "boxes",
    "occ": [
      "navidad"
    ],
    "desc": "Vino, caja de chocolates y nueces premium",
    "inc": [
      "Botella de vino tinto",
      "Caja de chocolates variados",
      "Nueces tostadas",
      "Caja de regalo decorada"
    ],
    "active": true
  },
  {
    "id": "nino-1",
    "name": "Cajita Adorable",
    "price": 13.0,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "9 fresas con decoración de animalitos en chocolate",
    "inc": [
      "9 fresas con decoración de animalitos",
      "Chocolate blanco y negro",
      "Tarjeta con dedicatoria"
    ],
    "active": true
  },
  {
    "id": "nino-2",
    "name": "Box Unicornio",
    "price": 16.5,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "12 fresas en chocolate blanco con temática de unicornio",
    "inc": [
      "12 fresas en chocolate blanco",
      "Temática de fantasia (unicornio)",
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-3",
    "name": "Osito Feliz",
    "price": 12.0,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "9 fresas cubiertas de chocolate con presentación de osito",
    "inc": [
      "9 fresas cubiertas de chocolate",
      "Presentación de osito decorativo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-4",
    "name": "Spider-Man",
    "price": 16.5,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "12 fresas con temática del personaje Spider-Man",
    "inc": [
      "12 fresas con temática Spider-Man",
      "Decoración del personaje favorito",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-5",
    "name": "Box Avengers",
    "price": 13.5,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "9 fresas gold collection con diseño exclusivo temática Avengers",
    "inc": [
      "9 fresas con diseño exclusivo en tonos dorados y oscuros",
      "Temática Avengers",
      "Caja de lujo",
      "Tarjeta"
    ],
    "active": true
  },
  {
    "id": "nino-6",
    "name": "Box Fondo De Bikini",
    "price": 16.5,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "12 fresas decoradas con temática de Bob Esponja",
    "inc": [
      "12 fresas decoradas",
      "Temática Bob Esponja",
      "Caja",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-7",
    "name": "Guerreras K-Pop Y Saja Boys",
    "price": 19.5,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "9 fresas con decoración temática en chocolate blanco y negro",
    "inc": [
      "9 fresas con decoración temática",
      "Chocolate blanco y negro",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-8",
    "name": "Combo Hot Wheels",
    "price": 16.5,
    "type": "boxes",
    "occ": [
      "nino"
    ],
    "desc": "6 fresas en chocolate blanco más 3 autos Hot Wheels",
    "inc": [
      "6 fresas en chocolate blanco",
      "3 Hot Wheels Cars disponibles",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-9",
    "name": "Mini Combo Hot Wheels",
    "price": 14.5,
    "type": "boxes",
    "occ": [
      "nino"
    ],
    "desc": "4 fresas en chocolate blanco más 2 autos Hot Wheels",
    "inc": [
      "4 fresas en chocolate blanco",
      "2 Hot Wheels Cars disponibles",
      "Caja corazón",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-10",
    "name": "Fresas Personalizadas",
    "price": 16.5,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "9 fresas con diseño a elección en chocolate",
    "inc": [
      "9 fresas con diseño a elección",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "nino-11",
    "name": "Pink Collection",
    "price": 16.25,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "Fresas decoradas en tonos rosa con diseños tiernos",
    "inc": [
      "Fresas decoradas en tonos rosa",
      "Diseños tiernos",
      "Tarjeta personalizada",
      "Caja de regalo"
    ],
    "active": true
  },
  {
    "id": "nino-12",
    "name": "Chiquitín",
    "price": 6.0,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "6 fresas decoradas con chocolate negro diseño clásico",
    "inc": [
      "6 fresas decoradas con chocolate negro",
      "Diseño clásico",
      "Caja decorada",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-13",
    "name": "Para Mi Princesa",
    "price": 10.0,
    "type": "fresas",
    "occ": [
      "nino"
    ],
    "desc": "6 fresas con chocolate blanco y rosa edición especial",
    "inc": [
      "6 fresas con chocolate blanco y rosa",
      "Edición especial",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "nino-14",
    "name": "Mi Niño Valiente",
    "price": 15.0,
    "type": "desayunos",
    "occ": [
      "nino"
    ],
    "desc": "4 mini waffles, fruta picada, bebida y salsas dulces",
    "inc": [
      "4 mini waffles",
      "Fruta picada",
      "Bebida fresas con chocolate",
      "Salsas dulces",
      "Tarjeta personalizada",
      "Caja decorada"
    ],
    "active": true
  },
  {
    "id": "nino-15",
    "name": "Regalame Una Sonrisa",
    "price": 12.5,
    "type": "desayunos",
    "occ": [
      "nino"
    ],
    "desc": "Waffles, fruta picada, batido de fresas y sándwich",
    "inc": [
      "Waffles",
      "Fruta picada",
      "Batido de fresas",
      "Sándwich de queso",
      "Caja decorativa",
      "Tarjeta decorativa"
    ],
    "active": true
  },
];
