// The 'helloworld' program.
program helloworld.aleo {
    transition main(public a: u32, b: u16) -> bool {

        // check if hash of the file is valid
        let hash: field = BHP256::hash_to_field(a);
        assert_eq(self.caller, aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a);
            
        // if current file is modified in last 24 hours dont create the proof
        if(b < 1440u16) 
            { return true; }    
        else
            { return false; }    


    }
}
