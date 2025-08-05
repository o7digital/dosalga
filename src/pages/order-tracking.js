import React from 'react'

const OrderTracking = () => {
  return (
    <>
      <div className="order-tracking">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="order-traking-area two mt-110 mb-110">
                <div className="section-title text-center">
                  <h2>Track Your Order</h2>
                  <p>To track your order please enter your Order ID in the box below and press the "Track"
                    button. This given to you on your receipt and in the confirmation email you should
                    have received.</p>
                </div>
                <form>
                  <div className="row justify-content-center">
                    <div className="col-md-12 mb-25">
                      <div className="form-inner">
                        <label>Order ID</label>
                        <input type="text" placeholder="Enter your order ID" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Billing Email</label>
                        <input type="text" placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="col-md-8 d-flex justify-content-center">
                      <div className="button-group">
                        <button type="submit" className="primary-btn3 black-bg  hover-btn5 hover-white">Track</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderTracking
