import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myTeamLogo from "/public/assets/img/my-team-logo.png";
import { useForm } from "react-hook-form";
import { User } from "../../../../../types/User";
import { BsEscape } from "react-icons/bs";

export interface PageHeaderProps {
  enableLogout?: boolean;
  children: React.ReactNode;
}

export default function PageHeader({
  enableLogout,
  children,
}: PageHeaderProps) {
  const { watch, setValue } = useForm<User>();

  const navigate = useNavigate();

  function handleLogout() {
    setValue("isLoggedIn", false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <Card className="m-4 border border-2">
      <Card.Header
        className={`text-center ${
          enableLogout && "justify-content-center d-flex"
        }`}
        style={{ backgroundColor: "#0e1129" }}
      >
        <img
          src={myTeamLogo}
          alt="Meu Time"
          className="me-2"
          width={400}
          height={200}
          onClick={() => navigate(watch("isLoggedIn") ? "/home" : "/login")}
        />
        {enableLogout && (
          <Button
            variant="link"
            className="text-light"
            onClick={handleLogout}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <BsEscape /> Sair
          </Button>
        )}
      </Card.Header>
      <Card.Body style={{ backgroundColor: "#204a6f" }} className="text-center">
        <div className="m-3">{children}</div>
      </Card.Body>
    </Card>
  );
}
