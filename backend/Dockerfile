# Gunakan image Node.js versi full (hindari alpine untuk bcrypt)
FROM node:20

# Tentukan working directory
WORKDIR /app

# Salin file dependensi dulu (agar caching npm install bisa efisien)
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh file project
COPY . .

# Buka port aplikasi
EXPOSE 5000

# Jalankan aplikasi
CMD ["node", "index.js"]
