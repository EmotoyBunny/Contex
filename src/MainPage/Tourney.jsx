import React from "react";
import Typography from "@material-ui/core/Typography";
import "./CssMainPage/AddingComponent.css"

export default function Tourney() {
    return (
        <div className="blockTourney">
            <div className="blockName">
                <Typography color="textPrimary" variant="h6">
                    К сожалению турниров пока нет. Но не беспокойтесь, скоро начнется чемпионат.
                </Typography>
            </div>
        </div>
    )
}