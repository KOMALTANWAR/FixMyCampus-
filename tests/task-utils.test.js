import test from "node:test";
import assert from "node:assert/strict";
import { createReport, getCounts, filterReports } from "../js/task-utils.js";

const sample = {title:"Broken tap",category:"Water",location:"Block A",priority:"High",description:"Tap is leaking"};
test("creates a valid report with default pending status",()=>{
  const report=createReport(sample,"FMC-123");
  assert.equal(report.id,"FMC-123"); assert.equal(report.status,"Pending"); assert.equal(report.title,"Broken tap");
});
test("trims text and rejects missing required fields",()=>{
  assert.equal(createReport({...sample,title:"  Light issue "},"X").title,"Light issue");
  assert.throws(()=>createReport({...sample,title:"  "}),/title is required/);
});
test("rejects invalid category and priority",()=>{
  assert.throws(()=>createReport({...sample,category:"Unknown"}),/Invalid category/);
  assert.throws(()=>createReport({...sample,priority:"Urgent"}),/Invalid priority/);
});
test("counts report statuses correctly",()=>{
  const reports=[{status:"Pending"},{status:"In Progress"},{status:"Resolved"},{status:"Pending"}];
  assert.deepEqual(getCounts(reports),{total:4,pending:2,progress:1,resolved:1});
});
test("filters by status, category and search query",()=>{
  const reports=[{...sample,id:"1",status:"Pending"},{...sample,id:"2",category:"Electrical",location:"Block B",status:"Resolved",title:"Light repair"}];
  assert.equal(filterReports(reports,{status:"Pending"}).length,1);
  assert.equal(filterReports(reports,{category:"Electrical"}).length,1);
  assert.equal(filterReports(reports,{query:"block a"}).length,1);
});
