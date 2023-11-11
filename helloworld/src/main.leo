// The 'helloworld' program.
program helloworld.aleo {
    transition main(public a: u32, b: u8) -> bool {
        if(b < 30u8) // if current file is modified in last 24 hours dont create the proof
        { return true; }    
        else
        { return false; }    
    }
}
