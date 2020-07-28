import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import ModalWrapped from '../Modal'

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import makeRequest from '../../service/dataservice';
import { Snackbars, SNACKBAR_TYPE } from "../Snackbar";

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
    },
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
    },
    margin: {
        margin: theme.spacing.unit / 2,
    },
    header: {
        width: '80px',
        paddingRight: '20px'
    },
    buttons: {
        //display: 'flex',
        // flexDirection: 'row'
    }
});

const header = ['Role', 'Last Name', 'First Name'];
// let userToEdit = {};

const details = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@john.com',
        role: 'Administrator'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@jane.com',
        role: 'Program committee'
    },
    {
        firstName: 'Jack',
        lastName: 'Doe',
        email: 'jack@jack.com',
        role: 'User'
    }
]

class SimpleTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5,
            userToModify: {},
            users: this.props.users
        };
    }

    handleOpenModal = () => {
        this.setState({ openModal: true })
    }

    handleOpenAddModal = () => {
        this.setState({ userToModify: {}, openModal: true })
    }

    handleModalClose = () => {
        this.setState({ openModal: false })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.users !== prevState.users) {
          return { someState: nextProps.users };
        }
        return null;
      }
    
      componentDidUpdate(prevProps) {
        if (prevProps.users !== this.props.users) {
          this.setState({ users: this.props.users });
        }
      }

    deleteUser = async username => {
        try {
            const response = await makeRequest('deleteUser', {
                data: {
                    username
                }
            });
            // this.props.snackBar(response, 'success');
            this.setState({
                users: JSON.parse(JSON.stringify(this.state.users.filter(user => user.username !== username)))
            })
        } catch (e) {
            // this.props.snackBar(e, 'error');
            console.log(e);
        }
    }

    edit = (username) => {
        const userToEdit = this.props.users.find(user => user.username === username);
        this.setState({ userToModify: userToEdit })
        this.handleOpenModal();
    }

    openSnackbar = (message, type) => {
        if (type === 'success') {
            this.setState({
                snackbarVariant: SNACKBAR_TYPE.success,
                snackbarMessage: message,
                openSnackbar: true
            });
        } else {
            this.setState({
                snackbarVariant: SNACKBAR_TYPE.error,
                snackbarMessage: message,
                openSnackbar: true
            });
        }
        window.location.reload();
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, details.length - page * rowsPerPage);
        return (
            <div>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow className='tableRow'>
                                {header.map((item, key) =>
                                    <TableCell align="left" key={key} className={this.props.classes.header}>{item}</TableCell>
                                )}
                                <TableCell align="right">
                                    <Fab size="small" color="primary" aria-label="Add" className={this.props.classes.margin} onClick={this.handleOpenAddModal}>
                                        <AddIcon />
                                    </Fab>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {row.roles}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.last_name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.first_name}
                                    </TableCell>
                                    <TableCell align="right" className={this.props.classes.buttons}>
                                        <IconButton aria-label="Edit" className={this.props.classes.margin} onClick={() => this.edit(row.username)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton aria-label="Delete" className={this.props.classes.margin} onClick={() => this.deleteUser(row.username)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={3}
                                    count={details.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>

                {this.state.openModal && <ModalWrapped
                    user={true}
                    onClose={this.handleModalClose}
                    open={this.state.openModal}
                    conferenceId={this.props.conferenceId}
                    editUser={this.state.userToModify}
                    onEdit={this.props.changeOccurred}
                />}
                <Snackbars
                    message={this.state.snackbarMessage}
                    open={this.state.openSnackbar}
                    handleClose={this.handleClose}
                    variant={this.state.snackbarVariant}
                />
            </div>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);