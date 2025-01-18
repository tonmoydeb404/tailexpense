import { RouterProvider } from "react-router";
import { Toaster } from "~/components/ui/sonner";
import { AppContextProvider } from "~/contexts/app";
import { ThemeProvider } from "~/contexts/theme";
import routes from "./routes";

type Props = {};

const App = (_props: Props) => {
  return (
    <>
      <ThemeProvider>
        <AppContextProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
