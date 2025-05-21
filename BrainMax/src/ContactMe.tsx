import {useState} from 'react';
import SERVER_URL from './config.ts'
const ContactMe = () => {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [contactStatus, setContactStatus] = useState('');

    const handleContactMe = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactStatus('')
        try {
            const response = await fetch(`${SERVER_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contactName,
                    email: contactEmail,
                    message: contactMessage,
                }),
            });
            if (response.ok) {
                setContactStatus('Message sent!');
                setContactName('');
                setContactEmail('');
                setContactMessage('');
            } else {
                setContactStatus('Failed to send message.');
            }
        } catch {
            setContactStatus('Failed to send message.');
        }
    };

    return (
        <section id="contact" className="py-20 px-8 sm:px-20">
            <h2 className="text-4xl font-bold text-center mb-8">Contact Me</h2>
            <form className="max-w-lg mx-auto space-y-4">
            <input
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                required
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-orange-200"
            />
            <input
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                required
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-orange-200"
            />
            <textarea
                value={contactMessage}
                onChange={e => setContactMessage(e.target.value)}
                required
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-orange-200"
            ></textarea>
            <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={handleContactMe}
            >
                Send Message
            </button>
            {contactStatus && <div className="text-center mt-2">{contactStatus}</div>}
            </form>
        </section>
    )
};

export default ContactMe;