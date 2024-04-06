const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const over=require("method-override");
app.use(over("_method"));
app.listen(port,()=>{
    console.log("Server Started!");
});
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const mysql = require('mysql2');
const { count } = require("console");   
const connection=mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'HIREEASE',
password: 'Hamzalfs@7086'
});
let per_user="";
let q="USE HIREEASE";
try{
    connection.query(q,(err,res)=>{
        if(err)
        {
            throw err; 
        }
    });
} catch{
    console.log("eRROR");
}
app.get("/",(req,res)=>{
    res.render("landing.ejs");
}); 
app.get("/login",(req,res)=>{
    let ers=" ";
    res.render("login.ejs",{ers});
}); 
app.post("/dash",(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let q=`SELECT * FROM CREDENTIAL WHERE USERNAME='${username}' AND PASSWORD='${password}'`;
    try{
        connection.query(q,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            if(resp.length==0)
            {
                ers="Wrong username or password!!";
                res.render("login.ejs",{ers});   
                return;
            }
            let sid=resp[0].SID;
            let hid=resp[0].HID;
            let cid=resp[0].CID;
            let rid=resp[0].RID;
            if(sid>0)
            {
                let q=`SELECT * FROM STUDENT WHERE sid=${sid}`;
                try{
                    connection.query(q,(err,resp1)=>{
                        if(err)
                        {
                            throw err; 
                        }
                        let status=resp1[0].PLACEMENT_STATUS;
                        console.log(resp1[0]);
                        if(status!=0)
                        {
                            res.render("congrats.ejs");
                        }
                        let st=resp1[0];
                        console.log(st.SNAME);
                        res.render("stdash.ejs",{st});
                    });
                } catch{
                    console.log("eRROR");
                }
            }
            else if(hid>0)
            {
                let q=`SELECT * FROM TPCHEAD WHERE hid=${hid}`;
                try{
                    connection.query(q,(err,resp1)=>{
                        if(err)
                        {
                            throw err; 
                        }
                        let q=`SELECT * FROM JOBS where status=0`;
                        try{
                            connection.query(q,(err,resp1)=>{
                                if(err)
                                {
                                    throw err; 
                                }
                                let n=resp1;
                                console.log("dcsidjcsoj");
                                console.log(resp1);
                                res.render("tpchdash.ejs",{n});
                            });
                        } catch{
                            console.log("eRROR");
                        }
                    });
                } catch{
                    console.log("eRROR");
                }
            }
            else if(cid>0)
            {
                let q=`SELECT * FROM TPCCORD WHERE cid=${cid}`;
                try{
                    connection.query(q,(err,resp)=>{
                        if(err)
                        {
                            throw err; 
                        }
                        let q=`SELECT * FROM JOBS where status=0`;
                        try{
                            connection.query(q,(err,resp1)=>{
                                if(err)
                                {
                                    throw err; 
                                }
                                let n=resp1;
                                console.log("dcsidjcsoj");
                                console.log(resp1);
                                res.render("tpchdash.ejs",{n});
                            });
                        } catch{
                            console.log("eRROR");
                        }
                    });
                } catch{
                    console.log("eRROR");
                }
            }
            else if(rid>0)
            {
                res.render("compdash.ejs");
            }
        });
    } catch{
        console.log("eRROR");
    }
});
app.get("/post",(req,res)=>{
    res.render("post.ejs");
}); 
app.post("/added",(req,res)=>{
    let username=req.body.uname;
    let password=req.body.password;
    let company=req.body.company;
    let gpa=req.body.gpa;
    let role=req.body.role;
    let salary=req.body.salary;
    let jdesc=req.body.jdesc;
    let requirement=req.body.requirement;
    console.log(req.body);
    let q=`SELECT * FROM JOBS`;
    try{
        connection.query(q,(err,resp1)=>{
            if(err)
            {
                throw err; 
            }
            let q=`INSERT INTO JOBS (JID, JobRole, JOBDES, REQUIREMENT, SALARY, CGPA, CID, STATUS) VALUES (${resp1.length+1},'${role}','${jdesc}', '${requirement}',${salary},${gpa}, ${company}, 0);`;
            try{
                connection.query(q,(err,resp2)=>{
                    if(err)
                    {
                        throw err; 
                    }
                    let q=`SELECT * FROM JOBS where status=0`;
                        try{
                            connection.query(q,(err,resp3)=>{
                                if(err)
                                {
                                    throw err; 
                                }
                                let n=resp3;
                                console.log("dcsidjcsoj");
                                console.log(resp3);
                                res.render("tpchdash.ejs",{n});
                            });
                        } catch{
                            console.log("eRROR");
                        }
                });
            } catch{
                console.log("eRROR");
            }
        });
    } catch{
        console.log("eRROR");
    }
});
app.get("/close",(req,res)=>{
    let q=`SELECT * FROM JOBS where status=0`;
    try{
        connection.query(q,(err,resp3)=>{
        if(err)
        {
            throw err; 
        }
        let n=resp3;
        console.log("dcsidjcsoj");
        console.log(resp3);
        res.render("tpchdel.ejs",{n});
        });
    } catch{
        console.log("eRROR");
    }
}); 
app.post("/delete",(req,res)=>{
    let jid=req.body.jid;
    let q=`UPDATE JOBS SET STATUS=1 WHERE JID=${jid}`;
    try{
        connection.query(q,(err,resp1)=>{
            if(err)
            {
                throw err; 
            }
            let q=`SELECT * FROM JOBS where status=0`;
            try{
                connection.query(q,(err,resp3)=>{
                if(err)
                {
                    throw err; 
                }
                let n=resp3;
                console.log("dcsidjcsoj");
                console.log(resp3);
                res.render("tpchdash.ejs",{n});
                });
            } catch{
                console.log("eRROR");
            }
        });
    } catch{
        console.log("eRROR");
    }
});
app.post("/view",(req,res)=>{
    let jid=req.body.jid;
    let q=`UPDATE JOBS SET STATUS=1 WHERE JID=${jid}`;
    try{
        connection.query(q,(err,resp1)=>{
            if(err)
            {
                throw err; 
            }
            let q=`SELECT * FROM JOBS where status=0`;
            try{
                connection.query(q,(err,resp3)=>{
                if(err)
                {
                    throw err; 
                }
                let n=resp3;
                console.log("dcsidjcsoj");
                console.log(resp3);
                res.render("tpchdash.ejs",{n});
                });
            } catch{
                console.log("eRROR");
            }
        });
    } catch{
        console.log("eRROR");
    }
});
app.get("/placed/0",(req,res)=>{
    let q=`SELECT * FROM STUDENT where PLACEMENT_STATUS=0`;
    try{
        connection.query(q,(err,resp3)=>{
        if(err)
        {
            throw err; 
        }
        let n=resp3;
        console.log("dcsidjcsoj");
        console.log(resp3);
        res.render("students.ejs",{n});
        });
    } catch{
        console.log("eRROR");
    }
}); 
app.get("/placed/1",(req,res)=>{
    let q=`SELECT * FROM STUDENT where PLACEMENT_STATUS=1`;
    try{
        connection.query(q,(err,resp3)=>{
        if(err)
        {
            throw err; 
        }
        let n=resp3;
        console.log("dcsidjcsoj");
        console.log(resp3);
        res.render("students.ejs",{n});
        });
    } catch{
        console.log("eRROR");
    }
}); 
app.post("/viewer",(req,res)=>{
    let jid=req.body.jid;
    let q=`SELECT * FROM JOBS WHERE JID=${jid}`;
    try{
        connection.query(q,(err,resp1)=>{
            if(err)
            {
                throw err; 
            }
            let n=resp1;
            res.render("jobdes.ejs",{n});
        });
    } catch{
        console.log("eRROR");
    }
});
app.post("/viewstu",(req,res)=>{
    let sid=req.body.sid;
    let q=`SELECT * FROM STUDENT WHERE SID=${sid}`;
    try{
        connection.query(q,(err,resp1)=>{
            if(err)
            {
                throw err; 
            }
            let st=resp1;
            res.render("viewstu.ejs",{st});
        });
    } catch{
        console.log("eRROR");
    }
});