import 'dotenv/config';
import { Role, UnitType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/config/db';
import { buildProductSearchText } from '../src/modules/search/arabic';

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@nema.local' },
    update: {},
    create: {
      email: 'admin@nema.local',
      password_hash: passwordHash,
      first_name: 'Admin',
      last_name: 'User',
      phone: '01000000001',
      role: Role.ADMIN,
      is_verified: true,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@nema.local' },
    update: {},
    create: {
      email: 'customer@nema.local',
      password_hash: passwordHash,
      first_name: 'John',
      last_name: 'Doe',
      phone: '01000000002',
      role: Role.CUSTOMER,
      is_verified: true,
    },
  });

  await prisma.address.upsert({
    where: { id: 'addr-customer-1' },
    update: {},
    create: {
      id: 'addr-customer-1',
      user_id: customer.id,
      label: 'Home',
      full_name: 'John Doe',
      phone: '01000000002',
      street: '123 Nile Street',
      city: 'Cairo',
      governorate: 'Cairo',
      is_default: true,
    },
  });

  const categories = [
    { slug: 'grains-rice', name: 'Grains & Rice', name_ar: 'حبوب وأرز', name_en: 'Grains & Rice' },
    { slug: 'spices-herbs', name: 'Spices & Herbs', name_ar: 'بهارات وأعشاب', name_en: 'Spices & Herbs' },
    { slug: 'nuts-dried-fruits', name: 'Nuts & Dried Fruits', name_ar: 'مكسرات وفواكه مجففة', name_en: 'Nuts & Dried Fruits' },
    { slug: 'oils-ghee', name: 'Oils & Ghee', name_ar: 'زيوت وسمن', name_en: 'Oils & Ghee' },
    { slug: 'tea-coffee', name: 'Tea & Coffee', name_ar: 'شاي وقهوة', name_en: 'Tea & Coffee' },
  ];

  const categoryRecords: Record<string, any> = {};
  for (const c of categories) {
    categoryRecords[c.slug] = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, name_ar: c.name_ar, name_en: c.name_en },
      create: { name: c.name, name_ar: c.name_ar, name_en: c.name_en, slug: c.slug, is_active: true },
    });
  }

  const weightOptions = [
    { id: 'wo-250g', label: 'ربع كيلو', value_in_grams: 250 },
    { id: 'wo-500g', label: 'نص كيلو', value_in_grams: 500 },
    { id: 'wo-1000g', label: 'كيلو', value_in_grams: 1000 },
  ];
  const woRecords: Record<string, any> = {};
  for (const w of weightOptions) {
    woRecords[w.id] = await prisma.weightOption.upsert({
      where: { id: w.id },
      update: {},
      create: { ...w, is_active: true },
    });
  }

  // Egyptian grocery catalogue: bilingual, weight-based products with variants
  const products = [
    {
      sku: 'SKU-RICE-1', category: 'grains-rice', brand: 'ريف الدلتا',
      name: 'Egyptian Rice', name_ar: 'أرز مصري', name_en: 'Egyptian Rice',
      description: 'Premium short-grain Egyptian rice.',
      description_ar: 'أرز مصري فاخر قصير الحبة.', description_en: 'Premium short-grain Egyptian rice.',
      pricePerKg: 35, stockKg: 200,
    },
    {
      sku: 'SKU-SUGAR-1', category: 'grains-rice', brand: 'الدلتا للسكر',
      name: 'White Sugar', name_ar: 'سكر أبيض', name_en: 'White Sugar',
      description: 'Refined white sugar.', description_ar: 'سكر أبيض مكرر.', description_en: 'Refined white sugar.',
      pricePerKg: 30, stockKg: 150,
    },
    {
      sku: 'SKU-TEA-1', category: 'tea-coffee', brand: 'العروسة',
      name: 'Black Tea', name_ar: 'شاي أسود', name_en: 'Black Tea',
      description: 'Full-bodied Egyptian black tea.', description_ar: 'شاي أسود مصري بطعم قوي.', description_en: 'Full-bodied Egyptian black tea.',
      pricePerKg: 120, stockKg: 60,
    },
    {
      sku: 'SKU-DATES-1', category: 'nuts-dried-fruits', brand: 'واحة سيوة',
      name: 'Siwa Dates', name_ar: 'تمر سيوة', name_en: 'Siwa Dates',
      description: 'Sweet dates from Siwa Oasis.', description_ar: 'تمر حلو من واحة سيوة.', description_en: 'Sweet dates from Siwa Oasis.',
      pricePerKg: 90, stockKg: 80,
    },
    {
      sku: 'SKU-NUTS-1', category: 'nuts-dried-fruits', brand: 'أبو عوف',
      name: 'Mixed Nuts', name_ar: 'مكسرات مشكلة', name_en: 'Mixed Nuts',
      description: 'A mix of roasted nuts.', description_ar: 'خليط من المكسرات المحمصة.', description_en: 'A mix of roasted nuts.',
      pricePerKg: 250, stockKg: 40,
    },
    {
      sku: 'SKU-OIL-1', category: 'oils-ghee', brand: 'كريستال',
      name: 'Sunflower Oil', name_ar: 'زيت عباد الشمس', name_en: 'Sunflower Oil',
      description: 'Pure sunflower cooking oil.', description_ar: 'زيت عباد الشمس النقي للطهي.', description_en: 'Pure sunflower cooking oil.',
      pricePerKg: 70, stockKg: 100,
    },
    {
      sku: 'SKU-SPICE-1', category: 'spices-herbs', brand: 'دواني',
      name: 'Cumin', name_ar: 'كمون', name_en: 'Cumin',
      description: 'Ground cumin spice.', description_ar: 'كمون مطحون.', description_en: 'Ground cumin spice.',
      pricePerKg: 180, stockKg: 25,
    },
  ];

  for (const p of products) {
    const category = categoryRecords[p.category];
    const search_text = buildProductSearchText({
      name: p.name, name_ar: p.name_ar, name_en: p.name_en, brand: p.brand, description: p.description,
    });

    const slug = p.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name, name_ar: p.name_ar, name_en: p.name_en,
        description: p.description, description_ar: p.description_ar, description_en: p.description_en,
        search_text,
      },
      create: {
        category_id: category.id,
        name: p.name, name_ar: p.name_ar, name_en: p.name_en,
        slug,
        description: p.description, description_ar: p.description_ar, description_en: p.description_en,
        unit_type: UnitType.WEIGHT,
        price_per_kg: p.pricePerKg,
        stock_in_grams: p.stockKg * 1000,
        sku: p.sku,
        thumbnail_url: 'https://via.placeholder.com/300',
        brand: p.brand,
        is_active: true,
        is_featured: true,
        search_text,
      },
    });

    for (const [woId, factor] of [['wo-250g', 0.25], ['wo-500g', 0.5], ['wo-1000g', 1]] as const) {
      const variantSku = `${p.sku}-${woId.replace('wo-', '')}`;
      await prisma.productWeightVariant.upsert({
        where: { sku: variantSku },
        update: {},
        create: {
          product_id: product.id,
          weight_option_id: woRecords[woId].id,
          price: Number((p.pricePerKg * factor).toFixed(2)),
          sku: variantSku,
        },
      });
    }
  }

  // Default settings
  await prisma.setting.upsert({
    where: { key: 'shipping_fee' },
    update: {},
    create: { key: 'shipping_fee', value: '25' },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
