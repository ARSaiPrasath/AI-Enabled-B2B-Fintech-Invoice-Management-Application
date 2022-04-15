import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
export default function Sortarrow({order}) {
    if (order == "ASC") {
        return <ArrowDropUpRoundedIcon />
    } else {
        return <ArrowDropDownRoundedIcon />
    }
}