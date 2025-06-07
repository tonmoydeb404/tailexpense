import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type Props = {};

const DataManagementSection = (_props: Props) => {
  return (
    <Card className="max-w-xl w-full shadow-none">
      <CardHeader>
        {/* <CardTitle>Personal Info</CardTitle> */}
        <CardDescription>Data Management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-3">
          <Label className="inline-block font-normal min-w-[110px]">
            Export Data As:{" "}
          </Label>
          <div className="flex flex-1 gap-2">
            <Button variant={"outline-solid"} size={"sm"} className="flex-1">
              CSV
            </Button>
            <Button variant={"outline-solid"} size={"sm"} className="flex-1">
              JSON
            </Button>
            <Button variant={"outline-solid"} size={"sm"} className="flex-1">
              PDF
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-3">
          <Label className="inline-block font-normal min-w-[110px]">
            Import Data:{" "}
          </Label>
          <Input type="file" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagementSection;
