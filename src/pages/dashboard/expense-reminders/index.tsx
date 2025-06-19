import { useSyncExpenseReminder } from "~/db/hooks";
import { paths } from "~/router/config";
import Header from "../common/header";
import DataTableSection from "./sections/data-table";

type Props = {};

const DashboardExpenseRemindersPage = (props: Props) => {
  useSyncExpenseReminder();

  return (
    <>
      <title>Reminders - TailExpenese</title>
      <Header
        title="Reminders"
        links={[
          { title: "Home", href: paths.dashboard.root },
          { title: "Reminders", href: paths.dashboard.reminders },
        ]}
      />
      <DataTableSection />
    </>
  );
};

export default DashboardExpenseRemindersPage;
