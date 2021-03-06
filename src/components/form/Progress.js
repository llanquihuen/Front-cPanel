import React from 'react'
import {LinearProgress} from '@material-ui/core'

const Progress = (percentage) => {
    return (
        <div>
            <LinearProgress variant="determinate" value={percentage} />

        </div>
    )
}

export default Progress
