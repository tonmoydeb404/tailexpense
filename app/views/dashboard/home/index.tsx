import Header from "../common/header";
import StatsSection from "./sections/stats";

type Props = {};

const DashboardHomeView = (props: Props) => {
  return (
    <>
      <Header title="Dashboard" links={[{ title: "Home" }]} />
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <StatsSection />
        </div>
        <div className="col-span-4"></div>
      </div>
    </>
  );
};

export default DashboardHomeView;
