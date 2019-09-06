const fs=require('fs');
const parser=require('@babel/parser');
const traverse=require('@babel/traverse').default;
const {transformFromAst}=require('@babel/core');
const path=require('path');

module.exports={
    getAst:(path)=>{
        const content=fs.readFileSync(path,'utf-8');
        return parser.parse(content,{
            sourceType:'module'
        });
    },
    getDependencies:(ast,filename)=>{
        const dependencies={};
        traverse(ast,{
            ImportDeclaration({node}) {
                const dirname=path.dirname(filename);
                const newfile='./' + path.join(dirname,node.source.value);
                dependencies[node.source.value]=newfile;
            }
        });
        // console.log(dependencies);
        return dependencies;
    },
    getCode:(ast)=>{
        const {code}=transformFromAst(ast,null,{
            presets:['@babel/preset-env']
        })
        return code;
    }
}
