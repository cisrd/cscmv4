import PruchasingFoodBasketChart from "@/components/dashboard/purchasing-food-basket-chart";
import PruchasingFoodBasketKpi from "@/components/dashboard/purchasing-food-basket-kpi";
import PurchasingStats from "@/components/dashboard/purchasing-stats";
import Header from "@/components/interface/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface DashboardProps {
  searchParams: {
    tab: string;
  };
}

const Home = ({ searchParams }: DashboardProps) => {
  let currentTab = searchParams.tab ?? "Purchase Data";

  if (currentTab != "Purchase Data" && currentTab != "Consumption Data") {
    currentTab = "Purchase Data";
  }

  return (
    <div className="flex flex-col h-screen">
      {/* <Header title="Dashboard"/> */}

      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="w-full p">
          <Tabs defaultValue={currentTab}>
            <TabsList className="m-4">
              <TabsTrigger value="Purchase Data" className="w-[200px]" asChild>
                <Link
                  href={{
                    query: { tab: "Purchase Data" },
                  }}
                >
                  Purchasing
                </Link>
              </TabsTrigger>
              <TabsTrigger
                value="Consumption Data"
                className="w-[200px]"
                asChild
              >
                <Link
                  href={{
                    query: { tab: "Consumption Data" },
                  }}
                >
                  Consumption
                </Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Purchase Data">
              <PurchasingStats />
              <div className="flex">
                <PruchasingFoodBasketKpi />
                <PruchasingFoodBasketChart />
              </div>
            </TabsContent>
            <TabsContent value="Consumption Data">Stats 2</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
