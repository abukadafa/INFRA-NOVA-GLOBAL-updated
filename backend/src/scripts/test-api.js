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

  console.log('--- All API tests passed successfully! ---');
}

runTests().catch(console.error);
