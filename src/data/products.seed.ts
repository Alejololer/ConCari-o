import type { Product } from "@/lib/types";

// Seed catalogue (imported from the Claude Design prototype). Used as a fallback when
// Supabase env vars are absent, and as the source for supabase/seed.sql. See handoff.md.
export const seedProducts: Product[] = [
  {
    "id": "p1",
    "name": "Caja Especial Clásica",
    "price": 11.5,
    "type": "fresas",
    "occ": [
      "papa",
      "especial"
    ],
    "desc": "6 fresas con chocolate y decoración tradicional, acompañadas de chocolates Ferrero. Una caja clásica que nunca falla.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada",
      "Chocolates Ferrero"
    ],
    "badge": "Clásico",
    "active": true
  },
  {
    "id": "p2",
    "name": "La Combinación Perfecta",
    "price": 15,
    "type": "boxes",
    "occ": [
      "papa",
      "amor"
    ],
    "desc": "6 fresas con chocolate más 1 cerveza Modelo premium, en caja decorada con tarjeta de mensaje personalizado.",
    "inc": [
      "Caja decorada",
      "Tarjeta con tu mensaje",
      "1 cerveza premium"
    ],
    "active": true
  },
  {
    "id": "p3",
    "name": "Súper Promo Papá Feliz",
    "price": 28,
    "type": "boxes",
    "occ": [
      "papa"
    ],
    "desc": "8 fresas cubiertas de chocolate en presentación de lujo, chocolates Ferrero y 2 cervezas Modelo premium.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada",
      "Chocolates Ferrero",
      "2 cervezas premium"
    ],
    "badge": "Premium",
    "active": true
  },
  {
    "id": "p4",
    "name": "Papá Especial Gold",
    "price": 18,
    "type": "fresas",
    "occ": [
      "papa",
      "amor"
    ],
    "desc": "Gold Collection de 10 fresas con diseño elegante más 1 cerveza Corona. Para un papá que merece lo mejor.",
    "inc": [
      "Caja de regalo",
      "Tarjeta personalizada",
      "1 cerveza Corona"
    ],
    "badge": "Gold",
    "active": true
  },
  {
    "id": "p5",
    "name": "Para Ti Papá Valiente",
    "price": 25,
    "type": "boxes",
    "occ": [
      "papa",
      "cumple"
    ],
    "desc": "Box con 2 cervezas Corona, papas Pringles, chocolate Hershey’s y 3 snacks a elección.",
    "inc": [
      "Diseño especial",
      "Tarjeta con tu mensaje",
      "2 cervezas + snacks"
    ],
    "active": true
  },
  {
    "id": "p6",
    "name": "Caja Amor de Papá",
    "price": 13.5,
    "type": "boxes",
    "occ": [
      "papa",
      "porquesi"
    ],
    "desc": "Fresas decoradas más cerveza Corona en una combinación irresistible y a buen precio.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p7",
    "name": "Box Festejo Papá",
    "price": 20,
    "type": "boxes",
    "occ": [
      "papa",
      "cumple"
    ],
    "desc": "2 cervezas, caja de chocolates Ferrero y papas Pringles. Perfecto para celebrar.",
    "inc": [
      "Caja de regalo",
      "Tarjeta personalizada",
      "Chocolates Ferrero"
    ],
    "active": true
  },
  {
    "id": "p8",
    "name": "Especialmente Para Ti",
    "price": 20,
    "type": "boxes",
    "occ": [
      "amor",
      "especial"
    ],
    "desc": "Hermoso detalle con Coca-Cola, papas Pringles, 2 cervezas Corona y chocolates Ferrero, en caja de corazón.",
    "inc": [
      "Caja decorativa de corazón",
      "Tarjeta personalizada"
    ],
    "badge": "Edición corazón",
    "active": true
  },
  {
    "id": "p9",
    "name": "Amor Eterno de Papá",
    "price": 10,
    "type": "boxes",
    "occ": [
      "papa",
      "porquesi"
    ],
    "desc": "Cerveza Corona, gomitas y 2 chocolates Ferrero. El detalle perfecto y accesible.",
    "inc": [
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p10",
    "name": "Box Collection",
    "price": 12.5,
    "type": "fresas",
    "occ": [
      "especial",
      "amor"
    ],
    "desc": "Fresas decoradas edición premium acompañadas de una cerveza Corona.",
    "inc": [
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p11",
    "name": "Edición Papá Amore",
    "price": 12.5,
    "type": "fresas",
    "occ": [
      "papa",
      "amor"
    ],
    "desc": "3 fresas con chocolate más cerveza Corona, en caja decorada.",
    "inc": [
      "Caja decorada",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p12",
    "name": "Fresas para Papá",
    "price": 12.5,
    "type": "fresas",
    "occ": [
      "papa"
    ],
    "desc": "4 fresas con diseño especial acompañadas de una cerveza.",
    "inc": [
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p13",
    "name": "Fresas Naruto",
    "price": 15.5,
    "type": "fresas",
    "occ": [
      "porquesi",
      "cumple",
      "especial"
    ],
    "desc": "Fresas decoradas edición premium con temática de Naruto. Para los fans más dulces.",
    "inc": [
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "badge": "Edición especial",
    "active": true
  },
  {
    "id": "p14",
    "name": "Fresas Dragon Ball",
    "price": 19,
    "type": "fresas",
    "occ": [
      "porquesi",
      "cumple"
    ],
    "desc": "10 fresas con diseño especial temática de Dragon Ball.",
    "inc": [
      "Caja de regalo",
      "Tarjeta personalizada"
    ],
    "badge": "Edición especial",
    "active": true
  },
  {
    "id": "p15",
    "name": "Desayuno Clásico",
    "price": 16.5,
    "type": "desayunos",
    "occ": [
      "mama",
      "papa",
      "especial"
    ],
    "desc": "Sándwich de jamón y queso, jugo de naranja, café con leche, fruta picada y chocolate.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p16",
    "name": "Desayuno Premium",
    "price": 23,
    "type": "desayunos",
    "occ": [
      "mama",
      "amor"
    ],
    "desc": "El más completo: sándwich, café latte frío o caliente, jugo, fruta, postre y 2 chocolates Kinder.",
    "inc": [
      "Caja de madera decorada",
      "Postre + 2 Kinder"
    ],
    "badge": "Premium",
    "active": true
  },
  {
    "id": "p17",
    "name": "Desayuno Ideal",
    "price": 15.5,
    "type": "desayunos",
    "occ": [
      "papa",
      "especial"
    ],
    "desc": "Presentación especial en caja de madera: sándwich, fruta, jugo y Ferrero Rocher.",
    "inc": [
      "Caja de madera",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p18",
    "name": "Desayuno Favorito",
    "price": 14.5,
    "type": "desayunos",
    "occ": [
      "amor",
      "mama"
    ],
    "desc": "Sándwich de jamón y doble queso, jugo de naranja y fresas con chocolate de lujo.",
    "inc": [
      "Caja decorativa",
      "Tarjeta personalizada"
    ],
    "active": true
  },
  {
    "id": "p19",
    "name": "Desayuno Ideal para Papá",
    "price": 15.5,
    "type": "desayunos",
    "occ": [
      "papa"
    ],
    "desc": "Sándwich, fruta, jugo de naranja, granola y yogurt.",
    "inc": [
      "Caja especial",
      "Tarjeta personalizada"
    ],
    "active": true
  }
];
