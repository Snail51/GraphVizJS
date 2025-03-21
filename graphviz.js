export class linker 
{
    constructor(baseURL = "https://edotor.net/")
    {
        this.baseURL = baseURL;
    }

    toLink(graphObj, engine = "dot")
    {
        var data = graphObj.toString();
        data = encodeURIComponent(data);

        return `${this.baseURL}?engine=${engine}#${data}`;
    }
}

export class graph
{
    constructor(type = "digraph", splines = "line")
    {
        this.type = type;
        this.splines = splines; // "none" "line" "polyline" "curved" "ortho" "spline"

        this.nodes = new Array();
        this.relations = new Array();
    }

    addNode(label, collate = true, shape = "ellipse", edgeColor = "black", fontColor = "black")
    {
        var key = "";
        if(collate)
        {
            key = label;
        }
        else
        {
            const random = "";
            while( random.length < 8 )
            {
                var letter = 65 + Math.round(Math.random() * 25);
                letter = String.fromCharCode(letter);
                random += letter;
            }
            key = `${label}_${random}`;
        }

        this.nodes.push(new node(label, key, shape, edgeColor, fontColor));
    }

    nodeExists(key)
    {
        for( var node of this.nodes )
        {
            if( node.key == key )
            {
                return true;
            }
        }
        return false;
    }

    getNode(key)
    {
        for( var node of this.nodes )
        {
            if( node.key == key )
            {
                return node;
            }
        }
        return null;
    }

    addRelation(keyA, keyB, label = "", style = "solid", lineColor = "black", labelColor = "black")
    {
        if(!this.nodeExists(keyA))
        {
            this.addNode(keyA, true);
        }
        if(!this.nodeExists(keyB))
        {
            this.addNode(keyB, true);
        }

        var nodeA = this.getNode(keyA);
        var nodeB = this.getNode(keyB);

        this.relations.push(new relation(nodeA, nodeB, label, this.type, style, lineColor, labelColor));
    }

    toString()
    {
        var result = new Array();

        switch(this.type)
        {
            case "digraph":
                result.push("digraph");
                break;
            case "graph":
                result.push("graph");
                break;
            default:
                result.push(" INVALID-GRAPH-TYPE ");
                break;
        }
        result.push("{");

        result.push(`splines="${this.splines}"`);

        for( var node of this.nodes )
        {
            result.push(node.toString());
        }

        for( var relation of this.relations )
        {
            result.push(relation.toString());
        }

        result.push("}");

        return result.join("\n");
    }

    clear()
    {
        this.nodes = new Array();
        this.relations = new Array();
    }
}

export class node
{
    constructor(label, key = label, shape = "ellipse", edgeColor = "black", fontColor = "black")
    {
        this.key = key;
        this.label = label;
        this.shape = shape;
        this.edgeColor = edgeColor;
        this.fontColor = fontColor;
    }

    toString()
    {
        var result = new Array();
        result.push(`"${this.key}"`);
        if(this.label != this.key){result.push(`[label="${this.label}"]`);}
        if(this.shape != "ellipse"){result.push(`[shape="${this.shape}"]`);}
        if(this.edgeColor != "black"){result.push(`[color="${this.edgeColor}"]`);}
        if(this.fontColor != "black"){result.push(`[fontColor="${this.fontColor}"]`);}
        result.push(";");

        return result.join("");
    }
}

export class relation 
{
    constructor(nodeA, nodeB, label = "", type = "digraph", style = "solid", lineColor = "black", labelColor = "black")
    {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.label = label;
        this.type = type;
        this.style = style;
        this.lineColor = lineColor;
        this.labelColor = labelColor;
    }

    toString()
    {
        var result = new Array();
        result.push(`"${this.nodeA.key}"`);
        switch(this.type)
        {
            case "digraph":
                result.push(" -> ");
                break;
            case "graph":
                result.push(" -- ");
                break;
            default:
                result.push(" INVALID-GRAPH-TYPE ");
                break;
        }
        result.push(`"${this.nodeB.key}"`);
        if(this.label != ""){result.push(`[label="${this.label}"]`);}
        if(this.style != "solid"){result.push(`[style="${this.style}"]`);}
        if(this.lineColor != "black"){result.push(`[color="${this.lineColor}"]`);}
        if(this.labelColor != "black"){result.push(`[fontColor="${this.labelColor}"]`);}
        result.push(";");

        return result.join("");
    }
}