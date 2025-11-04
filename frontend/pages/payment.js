import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { coursesAPI, paymentsAPI } from '../utils/api';

export default function Payment() {
  const router = useRouter();
  const { course_id } = router.query;
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('dummy');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (course_id) {
      fetchCourse();
    }
  }, [course_id, user]);

  const fetchCourse = async () => {
    try {
      const response = await coursesAPI.getById(course_id);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const response = await paymentsAPI.create({
        course_id: parseInt(course_id),
        payment_method: paymentMethod,
      });

      setPaymentData(response.data.payment);
      setSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return null;
  }

  if (success && paymentData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto card text-center">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-4">
              Transaction ID: <code className="bg-gray-100 px-2 py-1 rounded">{paymentData.transaction_id}</code>
            </p>
            <p className="text-gray-600 mb-4">
              Amount: ₹{paymentData.amount}
            </p>
            <p className="text-gray-600 mb-6">
              You have been enrolled in the course. Redirecting to profile...
            </p>
            <Link href="/profile" className="btn-primary">
              Go to Profile
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading payment page...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Complete Payment</h1>

          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Course Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-lg mb-2">{course.title}</p>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-primary-600">₹{course.price}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="dummy">Dummy Payment (Always Successful)</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="netbanking">Net Banking</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This is a dummy payment system. All payments will be processed successfully for demonstration purposes.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Course Price</span>
                  <span className="font-semibold">₹{course.price}</span>
                </div>
                <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary-600">₹{course.price}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="btn-primary w-full text-lg py-3 disabled:opacity-50"
              >
                {processing ? 'Processing Payment...' : 'Pay Now'}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <Link href={`/courses/${course_id}`} className="text-primary-600 hover:underline">
              ← Back to Course
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

