export default function chooseGameName(props){
    switch(props) {
        case "call_of_duty":
            return "Call of Duty: Warzone";
        case 'cs_go':
            return "Counter-Strike: Global Offensive";
        case 'clash_royal':
            return "Clash Royale";
        case 'dead_by_daylight':
            return "Dead by Daylight";
        case 'dota_2':
            return "Dota 2";
        case 'hearthstone':
            return "Hearthstone";
        case 'heroes_of_the_storm':
            return "Heroes of the Storm";
        case 'league_of_legends':
            return "League of Legends";
        case 'mortaL_combat':
            return "Mortal Kombat X";
        case 'overwatch':
            return "Overwatch";
        case 'quake':
            return "Quake Champions";
        case 'rainbow_six_siege':
            return "Tom Clancy's Rainbow Six Siege";
        case 'rocket_league':
            return "Rocket League";
        case 'smite':
            return "SMITE";
        case 'starcraft':
            return "StarCraft II";
        case 'team_fortress':
            return "Team Fortress 2";
        case 'tekken7':
            return "TEKKEN 7";
        case 'valorant':
            return "VALORANT";
        case 'warface':
            return "Warface";
        case 'world_of_tanks':
            return "World of Tanks";
        default:
    }
}