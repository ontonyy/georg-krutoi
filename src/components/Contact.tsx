import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<string>('');

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.current) {
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
                .then((result) => {
                    console.log(result.text);
                    setStatus('Message sent successfully!');
                    form.current?.reset();
                }, (error) => {
                    console.log(error.text);
                    setStatus('Failed to send message.');
                });
        }
    };

    return (
        <section id="contact" className="py-5 section-padding">
            <div className="container py-5">
                <h2 className="display-4 text-center mb-5 text-uppercase tracking-widest fw-bold">Contact Me</h2>

                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="glass rounded-4 overflow-hidden p-2 h-100 min-vh-50">
                            <iframe
                                src="https://www.google.com/maps/embed/v1/place?q=Hämeenlinna,+Finland&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                className="w-100 border-0 rounded-3"
                                style={{ minHeight: '400px', height: '100%' }}
                                loading="lazy"
                                title="Google Map Location"
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 d-flex flex-column justify-content-center">
                        <h3 className="h2 fw-semibold mb-4">Send email form</h3>
                        <form ref={form} onSubmit={sendEmail} className="d-flex flex-column gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                required
                                className="form-control form-control-lg custom-input glass text-body"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="form-control form-control-lg custom-input glass text-body"
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                required
                                className="form-control form-control-lg custom-input glass text-body"
                            />
                            <textarea
                                name="message"
                                placeholder="Project Details"
                                rows={5}
                                required
                                className="form-control form-control-lg custom-input glass text-body"
                            ></textarea>

                            <div>
                                <button
                                    type="submit"
                                    className="btn-custom border-0 glass hover-opacity hover-scale translateY px-5 py-3 rounded-3 text-body fw-bold fs-5 shadow-sm"
                                >
                                    Contact Me
                                </button>
                            </div>
                            {status && <p className="mt-3 small fw-medium opacity-75">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
