import React, { memo } from 'react';

import { Grid, Typography, Box, IconButton, withWidth, isWidthUp } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';

import WaveBorder from '../../utils/components/WaveBorder';

const styles = (theme: Theme) =>
    createStyles({
        footerInner: {
            backgroundColor: theme.palette.common.black,
            paddingTop: theme.spacing(8),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(6),
            [theme.breakpoints.up('sm')]: {
                paddingTop: theme.spacing(10),
                paddingLeft: theme.spacing(16),
                paddingRight: theme.spacing(16),
                paddingBottom: theme.spacing(10),
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing(10),
                paddingLeft: theme.spacing(10),
                paddingRight: theme.spacing(10),
                paddingBottom: theme.spacing(10),
            },
        },
        infoIcon: {
            color: `${theme.palette.common.white} !important`,
            backgroundColor: '#33383b !important',
        },
        socialIcon: {
            fill: theme.palette.common.white,
            backgroundColor: '#33383b',
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        },
    });

interface IProps extends WithStyles<typeof styles> {
    // non style props
    theme: Theme;
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    // injected style props
}

function Footer(props: IProps): JSX.Element {
    const { classes, theme, width } = props;
    return (
        <footer className="lg-p-top">
            <div className={classes.footerInner}>
                <Grid container spacing={isWidthUp('md', width) ? 10 : 5}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className="text-white">
                            Get in touch with us
                        </Typography>
                        <Box display="flex" mb={1}>
                            <Box mr={2}>
                                <IconButton className={classes.infoIcon} tabIndex={-1} disabled>
                                    <MailIcon />
                                </IconButton>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="center">
                                <Typography variant="h6" className="text-white">
                                    hyo-teamaltair@gmail.com
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" paragraph className="text-white">
                            About Us
                        </Typography>
                        <Typography style={{ color: '#8f9296' }} paragraph>
                            Hack Your Own&apos;s Team Altair is... blah blah
                        </Typography>
                        <Box display="flex">
                            <Box>
                                <IconButton
                                    aria-label={'Github'}
                                    className={classes.socialIcon}
                                    href={'https://github.com/HYO-Altair'}
                                >
                                    <GitHubIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </footer>
    );
}

export default withWidth()(withStyles(styles, { withTheme: true })(memo(Footer)));
