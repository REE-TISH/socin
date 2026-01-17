import { Check, X, Zap,ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/api';
import { toast } from 'react-toastify';


function Subscriptions() {
  
    const navigate = useNavigate()


    const free_plan = [
    
        { name: 'Create upto 5 Novels', free: true },
        { name: 'Create 60 Chapters/month', free: true },
        { name: 'Basic Analytics', free: true },
        { name: 'Unlimited Projects', free: false },
        { name: 'Priority Support', free: false, },
        { name: 'Advanced Analytics', free: false},
    ];

    const premium_plan = [
        { name: 'Unlimited Novels',  premium: true },
        { name: '450 Chapters/month', premium: true },
        { name: 'Basic Analytics',premium: true },
        { name: 'Unlimited Projects', premium: true },
        { name: 'Priority Support', premium: true },
        { name: 'Advanced Analytics', premium: true },
    ]

    const Subscribe_Plan = async ()=>{
        let Plan_id = 'plan_Rz72tNZlavxTk1'
        const { data } = await axiosInstance.post('/subscription/',{plan_id:Plan_id});

        const options = {
            key: data.key,
            subscription_id: data.subscription_id,
            name: "My SaaS",
            description: "Premium Plan",
            handler: function (response) {
                alert("Subscription Activated!");
            },
            theme: { color: "#3399cc" }
        };

        const razor = new window.Razorpay(options);
        razor.open();

    }

    return (
        <div className="min-h-screen bg-gradient-to-br flex flex-col items-center from-gray-900 to-black">
            <Link to={'/'} className='text-white w-full p-4 cursor-pointer'><ArrowLeft/></Link>
            <div className="container mx-auto px-4 py-4">
                <div className="text-center mb-4">
                <h1 className="text-5xl  text-slate-400 mb-4">
                    Choose Your Plan
                </h1>
                
                </div>

                <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                <div className="bg-slate-500 rounded-2xl shadow-lg p-3 md:p-8 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-8">
                    <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">Free Plan</h2>
                    <div className="mb-4">
                        <span className="text-3xl md:text-5xl font-bold text-slate-900">₹0</span>
                        <span className="text-slate-600 md:text-lg">/month</span>
                    </div>
            
                    </div>

                    <ul className="space-y-2 md:space-y-4 mb-8">
                    {free_plan.map((feature, index) => (
                        <li key={index} className="flex items-center">
                        {feature.free ? (
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                            <X className="w-5 h-5 text-slate-300 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.free ? 'text-slate-700' : 'text-slate-400'}>
                            {feature.name}
                        </span>
                        </li>
                    ))}
                    </ul>

                
                </div>
                    {/* Premium Plan */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 border-2 border-blue-400 relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-sm font-bold flex items-center">
                        <Zap className="w-4 h-4 mr-1" />
                        POPULAR
                    </span>
                    </div>

                    <div className="text-center ">
                    <h2 className="text-xl md:text-3xl font-bold text-white ">Premium Plan</h2>
                    <div className="mb-4">
                        <span className="text-3xl md:text-5xl font-bold text-white">₹199</span>
                        <span className="text-blue-100 md:text-lg">/month</span>
                    </div>
                
                    </div>

                    <ul className="space-y-2 md:space-y-4 mb-8">
                    {premium_plan.map((feature, index) => (
                        <li key={index} className="flex items-center">
                        {feature.premium ? (
                            <Check className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                        ) : (
                            <X className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.premium ? 'text-white font-medium' : 'text-blue-200'}>
                            {feature.name}
                        </span>
                        </li>
                    ))}
                    </ul>

                    <button onClick={Subscribe_Plan} className="w-full bg-white text-blue-600 cursor-pointer py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
                    Upgrade Now
                    </button>
                </div>
                </div>

                <div className="text-center mt-12">
                <p className="text-slate-600">
                    All plans include a 14-day money-back guarantee
                </p>
                </div>
            </div>
        </div>
  );
}

export default Subscriptions;
