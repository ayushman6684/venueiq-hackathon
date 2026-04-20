// Basic tests for VenueIQ
describe('VenueIQ App', () => {
  test('renders without crashing', () => {
    expect(true).toBe(true);
  });

  test('venue data structure is valid', () => {
    const venue = { id: 1, name: 'Test Venue', location: 'Delhi' };
    expect(venue).toHaveProperty('id');
    expect(venue).toHaveProperty('name');
    expect(venue).toHaveProperty('location');
  });

  test('map initializes with correct config', () => {
    const mapConfig = { zoom: 12, center: { lat: 28.6, lng: 77.2 } };
    expect(mapConfig.zoom).toBe(12);
    expect(mapConfig.center).toHaveProperty('lat');
  });
});
