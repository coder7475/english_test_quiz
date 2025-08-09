
const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 my-10">
            <h1 className="text-3xl font-bold mb-2">About Page</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                Welcome to our app! This platform is designed to help you test and manage your English proficiency.
            </p>
            <div className="max-w-2xl text-center text-gray-700 dark:text-gray-400 space-y-3">
                <p>
                    <strong>Features:</strong>
                </p>
                <ul className="list-disc list-inside text-left mx-auto max-w-md">
                    <li>Simple and intuitive user interface</li>
                    <li>Secure authentication and user management</li>
                    <li>Dark mode support for comfortable viewing</li>
                    <li>Responsive design for all devices</li>
                    <li>English proficiency testing based on CEFR standards</li>
                </ul>
                <div className="text-left mx-auto max-w-md space-y-2">
                    <h2 className="text-lg font-semibold mt-4">About CEFR</h2>
                    <p>
                        Our English proficiency tests are aligned with the <strong>Common European Framework of Reference for Languages (CEFR)</strong>. The CEFR is an internationally recognized standard for describing language ability, ranging from beginner (A1) to proficient (C2).
                    </p>
                    <ul className="list-disc list-inside ml-4">
                        <li>
                            <strong>A1 (Beginner):</strong> Can understand and use familiar everyday expressions and very basic phrases.
                        </li>
                        <li>
                            <strong>A2 (Elementary):</strong> Can communicate in simple and routine tasks requiring a simple exchange of information.
                        </li>
                        <li>
                            <strong>B1 (Intermediate):</strong> Can deal with most situations likely to arise whilst travelling and can produce simple connected text.
                        </li>
                        <li>
                            <strong>B2 (Upper Intermediate):</strong> Can interact with a degree of fluency and spontaneity and produce clear, detailed text.
                        </li>
                        <li>
                            <strong>C1 (Advanced):</strong> Can use language flexibly and effectively for social, academic, and professional purposes.
                        </li>
                        <li>
                            <strong>C2 (Proficient):</strong> Can understand with ease virtually everything heard or read and express themselves spontaneously, very fluently, and precisely.
                        </li>
                    </ul>
                    <p>
                        After completing our tests, you will receive feedback indicating your estimated CEFR level, helping you understand your current English proficiency and areas for improvement.
                    </p>
                </div>
                <p>
                    Our mission is to provide a seamless and enjoyable experience for users who want to boost their productivity and language skills. 
                    We are constantly working on new features and improvements based on your feedback.
                </p>
                <p>
                    If you have any questions or suggestions, feel free to reach out to us!
                </p>
            </div>
        </div>
    );
};

export default About;