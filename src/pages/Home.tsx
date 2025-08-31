import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    { id: 1, title: "Recipe CRUD (Redux, no API)", path: "/recipe" },
    { id: 2, title: "students CRUD (Redux + Dummy API)", path: "/students" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50"
            onClick={() => navigate(card.path)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Click to explore <span className="font-medium">{card.title}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
