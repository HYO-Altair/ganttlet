import React, { memo } from 'react';

import { Grid, Typography, withWidth, isWidthUp } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';

import FeatureCard from './FeatureCard';

const iconSize = 30;

const features = [
    {
        color: '#00C853',
        headline: 'Feature 1',
        text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.',
        icon: <BuildIcon style={{ fontSize: iconSize }} />,
        mdDelay: '0',
        smDelay: '0',
    },
];

const styles = () =>
    createStyles({
        bg: {
            backgroundColor: '#FFFFFF',
        },
    });

interface IProps extends WithStyles<typeof styles> {
    // non style props
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    // injected style props
}
function FeatureSection(props: IProps): JSX.Element {
    const { classes, width } = props;

    function calculateSpacing(width: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
        if (isWidthUp('lg', width)) {
            return 5;
        }
        if (isWidthUp('md', width)) {
            return 4;
        }
        if (isWidthUp('sm', width)) {
            return 3;
        }
        return 2;
    }

    return (
        <div className={classes.bg}>
            <div className="container-fluid lg-p-top">
                <Typography variant="h3" align="center" className="lg-mg-bottom">
                    Features
                </Typography>
                <div className="container-fluid">
                    <Grid container spacing={calculateSpacing(width)}>
                        {features.map((element) => (
                            <Grid
                                item
                                xs={6}
                                md={4}
                                data-aos="zoom-in-up"
                                data-aos-delay={isWidthUp('md', width) ? element.mdDelay : element.smDelay}
                                key={element.headline}
                            >
                                <FeatureCard
                                    Icon={element.icon}
                                    color={element.color}
                                    headline={element.headline}
                                    text={element.text}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default withWidth()(withStyles(styles, { withTheme: false })(memo(FeatureSection)));
