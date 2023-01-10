import { Avatar, Stack } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

type PaginationProps = {
    pageNum: number
}

const Pagination = ({ pageNum }: PaginationProps) => {
    const pageLinks: ReactNode[] = new Array(pageNum);
    let i = 0;
    while (i < pageNum) {
        pageLinks[i] = <Link href={`/?page=${i}`}><Avatar variant="square" sx={{
            bgcolor: `rgb(${Math.random() * 150 + 105},${Math.random() * 205 + 50},${Math.random() * 205 + 50})`,
            height: 30,
            width: 30,
        }}>{++i}</Avatar></Link>;
    }
    return <Stack direction='row' spacing={0.5} sx={{
        justifyContent: 'center',
        width: '50%',
        m: '0 auto',
        flexWrap: 'wrap',
    }}>{pageLinks}</Stack>;
}

export default Pagination;
