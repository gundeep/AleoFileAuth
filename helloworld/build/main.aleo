program helloworld.aleo;



function main:
    input r0 as u32.public;
    input r1 as u8.private;
    lt r1 30u8 into r2;
    ternary r2 true false into r3;
    output r3 as boolean.private;
