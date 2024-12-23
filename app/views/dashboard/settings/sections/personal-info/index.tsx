import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import CountryField from "./country-field";

type Props = {};

const PersonalInfoSection = (props: Props) => {
  return (
    <Card className="max-w-xl w-full">
      <CardHeader>
        {/* <CardTitle>Personal Info</CardTitle> */}
        <CardDescription>Personal Info</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Label className="inline-block font-normal min-w-[110px]">
            Your Name:{" "}
          </Label>
          <Input placeholder="Jhon Doe" className="flex-1" />
        </div>
        <div className="flex items-center gap-2 mb-5">
          <Label className="inline-block font-normal min-w-[110px]">
            Your Country:{" "}
          </Label>
          <CountryField />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size={"sm"}>Update Details</Button>
        <Button size={"sm"} variant={"outline"}>
          Cancel Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalInfoSection;
