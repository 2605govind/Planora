import { useNavigate } from "react-router";

export default function LandingPage() {
    const navigator = useNavigate()
  const courses = [
    { id: 1, title: "React for Beginners", desc: "Learn React from scratch." },
    { id: 2, title: "Node.js Mastery", desc: "Build powerful backend apps." },
    { id: 3, title: "MongoDB Deep Dive", desc: "Understand databases clearly." },
  ];

  const isLoggedIn = false; // yahan apni auth logic lagani hai

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-gray-800">MyCourseApp</h1>

        {!isLoggedIn && (
          <div className="space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigator('/login')}
            >
                
              Login
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
            onClick={() => navigator('/register')}>
              Signup
            </button>
          </div>
        )}
      </header>

      {/* Course Section */}
      <section className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Explore Our Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{course.desc}</p>
              <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
