import { SafeUser } from "@/types/user";

import Container from "@/components/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
  restaurant?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  restaurant
}) => {
  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <p className="text-2xl font-semibold">{restaurant}</p>
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  </div>
  );
}


export default Navbar;