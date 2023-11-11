// The 'helloworld' program.
program helloworld.aleo {
    transition main(public a: u32, b: u16) -> bool {
        if(b < 1440u16) // if current file is modified in last 24 hours dont create the proof
        { return true; }    
        else
        { return false; }    
    }
}
