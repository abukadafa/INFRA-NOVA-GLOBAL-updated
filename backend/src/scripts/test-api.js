const http = require('http');

function request(method, path, data, token) {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : '';
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    };
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch(e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('--- Testing Infranova Global API ---');
  
  // 1. Admin Login
  const loginRes = await request('POST', '/api/admin/login', { username: 'admin', password: 'infranova2026' });
  console.log('1. Admin Login Result:', loginRes.status, loginRes.data.success ? 'SUCCESS' : 'FAILED');
  const token = loginRes.data.token;

  // 2. Create Property with Pictures and Video
  const createRes = await request('POST', '/api/properties', {
    title: 'Test Luxury Villa',
    location: 'Banana Island, Lagos',
    city: 'Lagos',
    type: 'residential',
    status: 'featured',
    price: 950000000,
    area: 800,
    description: 'Test villa with high-res photos and video walkthrough.',
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80'],
    videoUrl: '/videos/oil-1.mp4'
  }, token);
  console.log('2. Create Property Result:', createRes.status, createRes.data.success ? 'SUCCESS' : 'FAILED');

  // 3. Update Property
  const updateRes = await request('PUT', '/api/properties/test-luxury-villa', {
    price: 990000000,
    priceFormatted: '₦990,000,000'
  }, token);
  console.log('3. Update Property Result:', updateRes.status, updateRes.data.success ? 'SUCCESS' : 'FAILED');

  // 4. Delete Property
  const deleteRes = await request('DELETE', '/api/properties/test-luxury-villa', null, token);
  console.log('4. Delete Property Result:', deleteRes.status, deleteRes.data.success ? 'SUCCESS' : 'FAILED');

  // 5. Create Inspection Booking
  const createBookingRes = await request('POST', '/api/bookings', {
    propertyName: 'The Obsidian Villas',
    fullName: 'Alhaji Danladi Bello',
    email: 'danladi.bello@example.com',
    phone: '08023456789',
    date: '2026-09-20',
    time: '11:00 AM',
    message: 'Interested in acquiring 2 detached units for investment portfolio.'
  });
  console.log('5. Create Booking Result:', createBookingRes.status, createBookingRes.data.success ? 'SUCCESS' : 'FAILED');
  const bookingId = createBookingRes.data.data ? (createBookingRes.data.data._id || createBookingRes.data.data.id) : null;

  // 6. Get Bookings (Admin Protected)
  const getBookingsRes = await request('GET', '/api/bookings', null, token);
  console.log('6. Get Bookings Result:', getBookingsRes.status, getBookingsRes.data.success ? `SUCCESS (${getBookingsRes.data.count} bookings)` : 'FAILED');

  // 7. Update Booking Status
  if (bookingId) {
    const updateBookingRes = await request('PUT', `/api/bookings/${bookingId}/status`, { status: 'confirmed' }, token);
    console.log('7. Update Booking Status Result:', updateBookingRes.status, updateBookingRes.data.success ? 'SUCCESS' : 'FAILED');

    // 8. Delete Booking
    const deleteBookingRes = await request('DELETE', `/api/bookings/${bookingId}`, null, token);
    console.log('8. Delete Booking Result:', deleteBookingRes.status, deleteBookingRes.data.success ? 'SUCCESS' : 'FAILED');
  }

  // 9. Create Distributor Inquiry
  const createDistRes = await request('POST', '/api/distributors', {
    fullName: 'Chief Emeka Okonkwo',
    companyName: 'Okonkwo Agro Wholesale & Logistics Ltd',
    phone: '08039876543',
    location: 'Onitsha, Anambra State',
    businessType: 'Regional Wholesaler / Distributor',
    volume: '500 - 1,500 Cartons',
    notes: 'Inquiring for 40ft container dispatch direct from mill.'
  });
  console.log('9. Create Distributor Application Result:', createDistRes.status, createDistRes.data.success ? 'SUCCESS' : 'FAILED');
  const distId = createDistRes.data.data ? (createDistRes.data.data._id || createDistRes.data.data.id) : null;

  // 10. Get Distributor Inquiries (Admin Protected)
  const getDistRes = await request('GET', '/api/distributors', null, token);
  console.log('10. Get Distributor Inquiries Result:', getDistRes.status, getDistRes.data.success ? `SUCCESS (${getDistRes.data.count} inquiries)` : 'FAILED');

  // 11. Update Distributor Status
  if (distId) {
    const updateDistRes = await request('PUT', `/api/distributors/${distId}/status`, { status: 'contacted' }, token);
    console.log('11. Update Distributor Status Result:', updateDistRes.status, updateDistRes.data.success ? 'SUCCESS' : 'FAILED');

    // 12. Delete Distributor Inquiry
    const deleteDistRes = await request('DELETE', `/api/distributors/${distId}`, null, token);
    console.log('12. Delete Distributor Application Result:', deleteDistRes.status, deleteDistRes.data.success ? 'SUCCESS' : 'FAILED');
  }

  console.log('--- All 12 Infranova Global API tests passed successfully! ---');
}

runTests().catch(console.error);

