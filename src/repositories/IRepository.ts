import { getManager } from "typeorm";
import TeamMember from "../models/TeamMember";

export default abstract class IRepository {

    protected getTeamMemberRepository() {
        return getManager("teamMember").getRepository(TeamMember);
    }

}
