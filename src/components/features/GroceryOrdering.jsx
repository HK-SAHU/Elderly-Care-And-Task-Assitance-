import { useState, useEffect } from 'react';
import './GroceryOrdering.css';

const GroceryOrdering = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    items: '',
    notes: '',
    urgency: 'normal',
    status: 'pending'
  });
  const [showForm, setShowForm] = useState(false);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('groceryOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Update localStorage when orders change
  useEffect(() => {
    localStorage.setItem('groceryOrders', JSON.stringify(orders));
  }, [orders]);

  const handleInputChange = (e) => {
    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newOrder.items) {
      alert('Please enter at least one grocery item');
      return;
    }
    
    const orderToAdd = {
      id: Date.now(),
      ...newOrder,
      date: new Date().toISOString(),
      volunteer: null
    };
    
    setOrders([...orders, orderToAdd]);
    
    // Reset form
    setNewOrder({
      items: '',
      notes: '',
      urgency: 'normal',
      status: 'pending'
    });
    
    setShowForm(false);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleVolunteerForOrder = (id) => {
    // In a real app, this would use the logged-in user's information
    const volunteerInfo = {
      id: '123',
      name: 'Harsh',
      phone: '6549873456'
    };
    
    setOrders(orders.map(order => 
      order.id === id ? { ...order, volunteer: volunteerInfo, status: 'in_progress' } : order
    ));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in_progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="grocery-ordering">
      <h2 className="feature-title">Grocery & Essentials Ordering</h2>
      <p className="feature-description">
        Request grocery items and essentials for your loved ones
      </p>
      
      <div className="grocery-actions">
        <button 
          className="btn-primary add-order-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ New Grocery Request'}
        </button>
      </div>
      
      {showForm && (
        <div className="order-form-container">
          <form onSubmit={handleSubmit} className="order-form">
            <h3>New Grocery Request</h3>
            
            <div className="form-group">
              <label htmlFor="items">Grocery Items*</label>
              <textarea
                id="items"
                name="items"
                value={newOrder.items}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter grocery items (one per line)"
                rows="5"
                required
              />
              <small className="form-text">List each item on a new line. Example: Milk, Bread, Eggs</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={newOrder.notes}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Any special instructions or preferences"
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="urgency">Urgency Level</label>
              <select
                id="urgency"
                name="urgency"
                value={newOrder.urgency}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="low">Low - Within a week</option>
                <option value="normal">Normal - Within 2-3 days</option>
                <option value="high">High - Within 24 hours</option>
              </select>
            </div>
            
            <button type="submit" className="btn-primary">
              Submit Request
            </button>
          </form>
        </div>
      )}
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No grocery orders yet. Click the button above to create a request.</p>
        </div>
      ) : (
        <div className="orders-container">
          <h3 className="section-title">Your Grocery Requests</h3>
          
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-date">{formatDate(order.date)}</span>
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {formatStatus(order.status)}
                    </span>
                  </div>
                  
                  <div className="order-urgency">
                    {order.urgency === 'high' && <span className="urgency-high">High Priority</span>}
                  </div>
                </div>
                
                <div className="order-items">
                  <h4>Items:</h4>
                  <pre>{order.items}</pre>
                </div>
                
                {order.notes && (
                  <div className="order-notes">
                    <h4>Notes:</h4>
                    <p>{order.notes}</p>
                  </div>
                )}
                
                {order.volunteer && (
                  <div className="volunteer-info">
                    <h4>Volunteer:</h4>
                    <p>{order.volunteer.name} - {order.volunteer.phone}</p>
                  </div>
                )}
                
                <div className="order-actions">
                  {order.status === 'pending' && (
                    <>
                      <button 
                        className="btn-volunteer"
                        onClick={() => handleVolunteerForOrder(order.id)}
                      >
                        Volunteer to Help
                      </button>
                      <button 
                        className="btn-cancel"
                        onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  
                  {order.status === 'in_progress' && (
                    <button 
                      className="btn-complete"
                      onClick={() => handleUpdateStatus(order.id, 'completed')}
                    >
                      Mark as Completed
                    </button>
                  )}
                  
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryOrdering;