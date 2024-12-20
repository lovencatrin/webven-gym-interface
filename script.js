// Keranjang (Cart) array untuk menyimpan item
let cart = [];

// Fungsi untuk menghitung total harga
function calculateTotal() {
  return cart.reduce((total, item) => total + parseInt(item.price), 0);
}

// Fungsi untuk menampilkan keranjang
function updateCart() {
  const cartTableBody = document.querySelector('#cartTable tbody');
  cartTableBody.innerHTML = ''; // Kosongkan isi tabel keranjang

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rp ${parseInt(item.price).toLocaleString()}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Hapus</button>
      </td>
    `;
    cartTableBody.appendChild(row);
  });

  // Tampilkan pesan jika keranjang kosong
  if (cart.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `<td colspan="3" class="text-center">Keranjang kosong</td>`;
    cartTableBody.appendChild(emptyRow);
  }

  // Update total harga
  const totalPrice = calculateTotal();
  document.getElementById('totalPrice').textContent = `Rp ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  alert(`Layanan "${name}" berhasil ditambahkan ke keranjang!`);
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(index) {
  cart.splice(index, 1); // Hapus item berdasarkan indeks
  updateCart();
  alert('Item berhasil dihapus dari keranjang!');
}

// Fungsi untuk melanjutkan transaksi
function proceedTransaction() {
  if (cart.length === 0) {
    alert('Keranjang Anda kosong. Tambahkan item terlebih dahulu.');
    return;
  }

  const totalPrice = calculateTotal();
  const itemList = cart.map(item => `- ${item.name} (Rp ${parseInt(item.price).toLocaleString()})`).join('\n');

  alert(`Terima kasih telah berbelanja!\n\nDetail Transaksi:\n${itemList}\n\nTotal Harga: Rp ${totalPrice.toLocaleString()}`);
  cart = []; // Kosongkan keranjang setelah transaksi
  updateCart();
}

// Event listener untuk tombol "Daftar" pada layanan
document.querySelectorAll('.order-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const serviceName = e.target.getAttribute('data-name');
    const servicePrice = e.target.getAttribute('data-price');
    addToCart(serviceName, servicePrice);
  });
});

// Formulir kontak
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Mencegah pengiriman formulir secara default

  // Ambil nilai input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Tampilkan pesan konfirmasi
  alert(`Terima kasih, ${name}! Pesan Anda telah dikirim.\nEmail: ${email}\nPesan: ${message}`);

  // Reset formulir setelah pengiriman
  document.getElementById('contactForm').reset();
  
  
});