import { useMediaQuery } from "react-responsive";

export default function useIsMobile() {
  return useMediaQuery({ maxWidth: 767 });
}
