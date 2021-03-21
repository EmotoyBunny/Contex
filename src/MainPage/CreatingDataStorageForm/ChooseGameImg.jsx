import call_of_duty from "./LogoGames/call_of_duty.jpg"
import clash_royal from "./LogoGames/clash_royale.jpg"
import cs_go from "./LogoGames/cs_go.jpg"
import dead_by_daylight from "./LogoGames/dead_by_daylight.jpeg"
import dota_2 from "./LogoGames/dota_2.jpg"
import hearthstone from "./LogoGames/hearthstone.jpg"
import heroes_of_the_storm from "./LogoGames/heroes_of_the_storm.jpg"
import league_of_legends from "./LogoGames/league_of_legends.jpg"
import mortaL_combat from "./LogoGames/mortal_combat.jpg"
import overwatch from "./LogoGames/overwatch2.jpg"
import quake from "./LogoGames/quake.jpg"
import rainbow_six_siege from "./LogoGames/rainbow_6_siege.jpg"
import rocket_league from "./LogoGames/rocket_league.jpg"
import smite from "./LogoGames/smite.jpg"
import starcraft from "./LogoGames/starcraft_2.jpg"
import team_fortress from "./LogoGames/team_fortress.jpg"
import tekken7 from "./LogoGames/tekken7.jpg"
import valorant from "./LogoGames/valorant.jpg"
import warface from "./LogoGames/warface.jpg"
import world_of_tanks from "./LogoGames/world_of_tanks.jpg"
import missing from "./LogoGames/missing.png"

export default function chooseGame(props) {
    switch(props) {
        case 'call_of_duty':
            return call_of_duty;
        case 'cs_go':
            return cs_go;
        case 'clash_royal':
            return clash_royal;
        case 'dead_by_daylight':
            return dead_by_daylight;
        case 'dota_2':
            return dota_2;
        case 'hearthstone':
            return hearthstone;
        case 'heroes_of_the_storm':
            return heroes_of_the_storm;
        case 'league_of_legends':
            return league_of_legends;
        case 'mortaL_combat':
            return mortaL_combat;
        case 'overwatch':
            return overwatch;
        case 'quake':
            return quake;
        case 'rainbow_six_siege':
            return rainbow_six_siege;
        case 'rocket_league':
            return rocket_league;
        case 'smite':
            return smite;
        case 'starcraft':
            return starcraft;
        case 'team_fortress':
            return team_fortress;
        case 'tekken7':
            return tekken7;
        case 'valorant':
            return valorant;
        case 'warface':
            return warface;
        case 'world_of_tanks':
            return world_of_tanks;
        case '':
            return missing;
        default:
    }
}