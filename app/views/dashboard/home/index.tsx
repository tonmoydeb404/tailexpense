import Header from "../common/header";
import BudgetUsage from "./sections/budget-usage";
import ExpenseStats from "./sections/expense-stats";
import MonthlyUsage from "./sections/monthly-usage";
import RecentSection from "./sections/recent";
import StatsSection from "./sections/stats";

type Props = {};

// ----------------------------------------------------------------------

const DashboardHomeView = (props: Props) => {
  return (
    <>
      <Header title="Dashboard" links={[{ title: "Home" }]} />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 2xl:col-span-9">
          <StatsSection />
          <div className="grid grid-cols-12 gap-5 mb-10">
            <div className="col-span-4">
              <MonthlyUsage />
            </div>
            <div className="col-span-8">
              <BudgetUsage />
            </div>
          </div>
          <ExpenseStats />
        </div>
        <div className="col-span-4 2xl:col-span-3">
          <RecentSection />
        </div>
      </div>
    </>
  );
};

export default DashboardHomeView;
