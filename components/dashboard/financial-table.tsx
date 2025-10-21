/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  Group,
  X,
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type DataType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "array"
  | "object"
  | "unknown";

interface ColumnConfig {
  key: string;
  label: string;
  type?: DataType;
  format?: (value: any) => string;
  sortable?: boolean;
}

interface DynamicTableProps {
  data: Record<string, any>[];
  columns?: ColumnConfig[];
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
}

interface FilterRule {
  field: string;
  operator: string;
  value: string;
}

interface FilterState {
  logicOperator: "AND" | "OR";
  rules: FilterRule[];
}

const financialColumns: ColumnConfig[] = [
  {
    key: "date",
    label: "Date",
    type: "date",
    sortable: true,
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "description",
    label: "Description",
    type: "string",
    sortable: true,
  },
  {
    key: "category",
    label: "Category",
    type: "string",
    sortable: true,
  },
  {
    key: "type",
    label: "Type",
    type: "string",
    sortable: true,
  },
  {
    key: "amount",
    label: "Amount",
    type: "number",
    sortable: true,
    format: (value) => {
      const amount = Number(value);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Math.abs(amount));
      return amount >= 0 ? formatted : `-${formatted}`;
    },
  },
  {
    key: "account",
    label: "Account",
    type: "string",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    type: "string",
    sortable: true,
  },
  {
    key: "tags",
    label: "Tags",
    type: "array",
    sortable: false,
  },
];

export default function FinancialTable({
  data,
  columns = financialColumns,
  pageSize = 10,
  searchable = true,
  sortable = true,
  filterable = true,
  groupable = true,
}: DynamicTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    logicOperator: "AND",
    rules: [],
  });
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    logicOperator: "AND",
    rules: [],
  });
  const [groupByField, setGroupByField] = useState<string | null>(null);
  const [appliedTags, setAppliedTags] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [pageSizeOptions] = useState([5, 10, 20, 50, 100]);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const autoDetectedColumns = useMemo((): ColumnConfig[] => {
    if (columns) return columns;

    if (data.length === 0) return [];

    const keys = Array.from(new Set(data.flatMap((item) => Object.keys(item))));

    return keys.map((key) => {
      const type = detectDataType(
        data.find((item) => item[key] !== undefined)?.[key]
      );

      return {
        key,
        label:
          key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1),
        type,
        sortable: type !== "object" && type !== "unknown",
      };
    });
  }, [data, columns]);

  function detectDataType(value: any): DataType {
    if (value === null || value === undefined) return "unknown";

    if (Array.isArray(value)) return "array";

    if (value instanceof Date) return "date";

    const type = typeof value;

    if (type === "string") {
      const datePattern =
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
      if (datePattern.test(value) && !isNaN(Date.parse(value))) {
        return "date";
      }
      return "string";
    }

    if (type === "number") return "number";
    if (type === "boolean") return "boolean";
    if (type === "object") return "object";

    return "unknown";
  }

  const applyFilter = () => {
    setActiveFilters(filterState);

    const tags = filterState.rules.map(
      (rule) => `${rule.field} ${rule.operator} ${rule.value}`
    );
    setAppliedTags(tags);
  };

  const removeFilter = (index: number) => {
    const newRules = [...filterState.rules];
    newRules.splice(index, 1);
    const newFilterState = { ...filterState, rules: newRules };
    setFilterState(newFilterState);
    setActiveFilters(newFilterState);

    const newTags = [...appliedTags];
    newTags.splice(index, 1);
    setAppliedTags(newTags);
  };

  const addFilterRule = () => {
    if (autoDetectedColumns.length === 0) return;

    setFilterState((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          field: autoDetectedColumns[0].key,
          operator: "=",
          value: "",
        },
      ],
    }));
  };

  const updateFilterRule = (index: number, field: string, value: any) => {
    const newRules = [...filterState.rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setFilterState({ ...filterState, rules: newRules });
  };

  const getOperatorsForType = (type: DataType) => {
    switch (type) {
      case "number":
      case "date":
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
          { value: ">", label: ">" },
          { value: "<", label: "<" },
          { value: ">=", label: ">=" },
          { value: "<=", label: "<=" },
        ];
      case "string":
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
          { value: "contains", label: "Contains" },
          { value: "startsWith", label: "Starts with" },
          { value: "endsWith", label: "Ends with" },
        ];
      case "boolean":
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
        ];
      default:
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
        ];
    }
  };

  const evaluateFilterRule = (value: any, rule: FilterRule, type: DataType) => {
    if (value === null || value === undefined) return false;

    const strValue = String(value).toLowerCase();
    const filterValue = rule.value.toLowerCase();

    switch (rule.operator) {
      case "=":
        if (type === "boolean") {
          return (
            (value === true && filterValue === "true") ||
            (value === false && filterValue === "false")
          );
        }
        return type === "string"
          ? strValue === filterValue
          : value == rule.value;
      case "!=":
        if (type === "boolean") {
          return (
            (value === true && filterValue !== "true") ||
            (value === false && filterValue !== "false")
          );
        }
        return type === "string"
          ? strValue !== filterValue
          : value != rule.value;
      case ">":
        return type === "date"
          ? new Date(value) > new Date(rule.value)
          : Number(value) > Number(rule.value);
      case "<":
        return type === "date"
          ? new Date(value) < new Date(rule.value)
          : Number(value) < Number(rule.value);
      case ">=":
        return type === "date"
          ? new Date(value) >= new Date(rule.value)
          : Number(value) >= Number(rule.value);
      case "<=":
        return type === "date"
          ? new Date(value) <= new Date(rule.value)
          : Number(value) <= Number(rule.value);
      case "contains":
        return strValue.includes(filterValue);
      case "startsWith":
        return strValue.startsWith(filterValue);
      case "endsWith":
        return strValue.endsWith(filterValue);
      default:
        return false;
    }
  };

  function formatValue(value: any, type: DataType): string {
    if (value === null || value === undefined) return "";

    switch (type) {
      case "date":
        const date = value instanceof Date ? value : new Date(value);
        return isNaN(date.getTime())
          ? String(value)
          : date.toLocaleDateString();
      case "array":
        return Array.isArray(value) ? value.join(", ") : String(value);
      case "object":
        return JSON.stringify(value);
      default:
        return String(value);
    }
  }

  const filteredData = useMemo(() => {
    let result = data;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) => {
        return Object.values(row).some(
          (value) =>
            value !== null &&
            value !== undefined &&
            String(value).toLowerCase().includes(query)
        );
      });
    }

    if (activeFilters.rules.length > 0) {
      result = result.filter((row) => {
        const results = activeFilters.rules.map((rule) => {
          const column = autoDetectedColumns.find(
            (col) => col.key === rule.field
          );
          if (!column) return false;

          const value = row[rule.field];
          const type = column.type || detectDataType(value);

          return evaluateFilterRule(value, rule, type);
        });

        return activeFilters.logicOperator === "AND"
          ? results.every(Boolean)
          : results.some(Boolean);
      });
    }

    return result;
  }, [data, searchQuery, activeFilters, autoDetectedColumns]);

  const sortedAndGroupedData = useMemo(() => {
    let result = [...filteredData];

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || aValue === null)
          return sortConfig.direction === "asc" ? -1 : 1;
        if (bValue === undefined || bValue === null)
          return sortConfig.direction === "asc" ? 1 : -1;

        const columnType =
          autoDetectedColumns.find((col) => col.key === sortConfig.key)?.type ||
          "string";

        if (columnType === "date") {
          const dateA = aValue instanceof Date ? aValue : new Date(aValue);
          const dateB = bValue instanceof Date ? bValue : new Date(bValue);
          return sortConfig.direction === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }

        if (columnType === "number") {
          return sortConfig.direction === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        const strA = String(aValue).toLowerCase();
        const strB = String(bValue).toLowerCase();

        if (sortConfig.direction === "asc") {
          return strA.localeCompare(strB);
        } else {
          return strB.localeCompare(strA);
        }
      });
    }

    if (groupByField) {
      const groups: Record<string, any[]> = {};
      result.forEach((item) => {
        const groupValue = item[groupByField];
        const groupKey =
          groupValue === null || groupValue === undefined
            ? "No value"
            : String(groupValue);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
      });
      result = Object.entries(groups).map(([groupKey, items]) => ({
        __isGroupRow: true,
        __groupKey: groupKey,
        __groupField: groupByField,
        __itemCount: items.length,
        __items: items,
      }));
    }

    return result;
  }, [filteredData, sortConfig, groupByField, autoDetectedColumns]);

  const totalPages = Math.ceil(sortedAndGroupedData.length / currentPageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * currentPageSize;
    return sortedAndGroupedData.slice(startIndex, startIndex + currentPageSize);
  }, [sortedAndGroupedData, currentPage, currentPageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleSort = (key: string) => {
    if (!sortable) return;

    const column = autoDetectedColumns.find((col) => col.key === key);
    if (!column?.sortable) return;

    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const renderCellValue = (
    row: any,
    columnKey: string,
    type: DataType,
    column?: ColumnConfig
  ) => {
    if (row.__isGroupRow && columnKey === row.__groupField) {
      return (
        <div className="font-medium">
          Group: {row.__groupKey} ({row.__itemCount} items)
        </div>
      );
    }

    if (row.__isGroupRow) {
      return null;
    }

    const value = row[columnKey];
    if (value === null || value === undefined) return null;

    if (column?.format) {
      return column.format(value);
    }

    switch (type) {
      case "boolean":
        return (
          <Badge variant={value ? "default" : "outline"}>
            {value ? "Yes" : "No"}
          </Badge>
        );
      case "array":
        if (!Array.isArray(value)) return formatValue(value, type);
        return (
          <div className="flex flex-wrap gap-1">
            {value.slice(0, 3).map((item, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {String(item)}
              </Badge>
            ))}
            {value.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{value.length - 3}
              </Badge>
            )}
          </div>
        );
      case "date":
        const date = value instanceof Date ? value : new Date(value);
        return isNaN(date.getTime())
          ? String(value)
          : date.toLocaleDateString();
      case "number":
        if (columnKey === "amount") {
          const amount = Number(value);
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(Math.abs(amount));

          return (
            <div
              className={`flex items-center gap-1 ${
                amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {amount >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="font-medium">
                {amount >= 0 ? formatted : `-${formatted}`}
              </span>
            </div>
          );
        }
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      default:
        return formatValue(value, type);
    }
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(
      sortedAndGroupedData.length / currentPageSize
    );
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }
  }, [sortedAndGroupedData, currentPageSize, currentPage]);

  return (
    <div className="w-full space-y-4 relative ">
      {searchable && (
        <div className="relative">
          <Search className="absolute left-2.5 top-5 h-4 w-4 text-muted-foreground" />
          <div className="flex items-center flex-wrap gap-2 pl-8 pr-3 py-2 bg-background border border-slate-700/50 rounded-md">
            <Input
              type="search"
              placeholder="Search transactions..."
              className="flex-grow border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {(groupByField || searchQuery || appliedTags.length > 0) && (
            <div className="flex items-center flex-wrap gap-2 pl-1 pr-3 py-1 mt-2 bg-background border border-slate-700/50 rounded-md">
              {groupByField && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Group className="h-3 w-3" />
                  Grouped by: {groupByField}
                  <X
                    className="size-3 text-red-400 cursor-pointer pointer-events-auto!"
                    onClick={() => setGroupByField(null)}
                  />
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Search className="size-3" />
                  Search: {searchQuery}
                  <X
                    className="size-3 cursor-pointer text-red-400 pointer-events-auto!"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {appliedTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="default"
                  className="flex items-center gap-1"
                >
                  <Filter className="size-3" />
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer text-red-400 pointer-events-auto!"
                    onClick={() => removeFilter(index)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
      {(appliedTags.length > 0 || groupByField || searchQuery) && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 absolute right-0 top-[54px] cursor-pointer text-xs bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          onClick={() => {
            setFilterState({ logicOperator: "AND", rules: [] });
            setActiveFilters({ logicOperator: "AND", rules: [] });
            setAppliedTags([]);
            setGroupByField(null);
            setSearchQuery("");
          }}
        >
          Clear all filters
        </Button>
      )}

      <div className="flex flex-wrap gap-2">
        {filterable && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:!bg-slate-700 hover:!text-cyan-400 cursor-pointer ml-2"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-slate-900/70 backdrop-blur-sm border border-slate-700/50">
              <DialogHeader>
                <DialogTitle>Advanced Filters</DialogTitle>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className={cn(
                      "cursor-pointer",
                      filterState.logicOperator === "AND" && "text-cyan-400"
                    )}
                    size="sm"
                    onClick={() =>
                      setFilterState({ ...filterState, logicOperator: "AND" })
                    }
                  >
                    AND
                  </Button>
                  <Button
                    variant="default"
                    className={cn(
                      "cursor-pointer",
                      filterState.logicOperator === "OR" && "text-cyan-400"
                    )}
                    size="sm"
                    onClick={() =>
                      setFilterState({ ...filterState, logicOperator: "OR" })
                    }
                  >
                    OR
                  </Button>

                  <div className="ml-auto">
                    <Button variant="default" size="sm" onClick={addFilterRule} className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                      <Plus className="size-4 mr-1 text-cyan-500" /> Add Rule
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {filterState.rules.map((rule, index) => {
                    const column = autoDetectedColumns.find(
                      (col) => col.key === rule.field
                    );
                    const dataType = column?.type || "string";
                    const operators = getOperatorsForType(dataType);

                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Select
                          value={rule.field}
                          onValueChange={(value) =>
                            updateFilterRule(index, "field", value)
                          }
                        >
                          <SelectTrigger className="w-[180px] border-slate-700/50">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50">
                            {autoDetectedColumns.map((column) => (
                              <SelectItem key={column.key} value={column.key}>
                                {column.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={rule.operator}
                          onValueChange={(value) =>
                            updateFilterRule(index, "operator", value)
                          }
                        >
                          <SelectTrigger className="w-[150px] border-slate-700/50">
                            <SelectValue placeholder="Operator" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50">
                            {operators.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {op.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          value={rule.value}
                          onChange={(e) =>
                            updateFilterRule(index, "value", e.target.value)
                          }
                          className="flex-1 bg-slate-900/70  border border-slate-700/50 text-slate-400"
                          placeholder="Value"
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newRules = [...filterState.rules];
                            newRules.splice(index, 1);
                            setFilterState({ ...filterState, rules: newRules });
                          }}
                        >
                          <X className="size-4 text-red-400" />
                        </Button>
                      </div>
                    );
                  })}

                  {filterState.rules.length === 0 && (
                    <div className="text-center text-gray-400 py-4 text-sm">
                      No filter rules. Click &quot;Add Rule&quot; to add one.
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="default"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-400"
                  onClick={() => {
                    setFilterState({ logicOperator: "AND", rules: [] });
                    setActiveFilters({ logicOperator: "AND", rules: [] });
                    setAppliedTags([]);
                  }}
                >
                  Clear
                </Button>
                <Button onClick={applyFilter}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {groupable && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Group className="h-4 w-4 mr-2" />
                Group by
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-2">
                <div className="space-y-2">
                  {autoDetectedColumns.map((column) => (
                    <Button
                      key={column.key}
                      variant={
                        groupByField === column.key ? "default" : "ghost"
                      }
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        setGroupByField(
                          groupByField === column.key ? null : column.key
                        )
                      }
                    >
                      {column.label}
                    </Button>
                  ))}

                  {groupByField && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => setGroupByField(null)}
                    >
                      Remove grouping
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="rounded-md border border-slate-700/50">
        <Table>
          <TableHeader>
            <TableRow>
              {autoDetectedColumns.map((column) => (
                <TableHead
                  key={column.key}
                  className={
                    column.sortable && sortable
                      ? "cursor-pointer select-none"
                      : ""
                  }
                  onClick={() =>
                    column.sortable && sortable && handleSort(column.key)
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortable &&
                      column.sortable &&
                      sortConfig?.key === column.key &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                    {groupByField === column.key && (
                      <Badge variant="default" className="ml-2 h-5 px-1.5 bg-slate-600">
                        Grouped
                      </Badge>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={autoDetectedColumns.length}
                  className="text-center py-8"
                >
                  <div className="flex flex-col items-center gap-2">
                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No transactions found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) =>
                row.__isGroupRow ? (
                  <TableRow key={`group-${rowIndex}`} className="bg-muted">
                    <TableCell colSpan={autoDetectedColumns.length}>
                      <Collapsible
                        open={expandedGroups.includes(row.__groupKey)}
                        onOpenChange={(isOpen) => {
                          setExpandedGroups((prev) =>
                            isOpen
                              ? [...prev, row.__groupKey]
                              : prev.filter((key) => key !== row.__groupKey)
                          );
                        }}
                      >
                        <CollapsibleTrigger className="flex items-center w-full">
                          <ChevronRight
                            className={`h-4 w-4 mr-2 transition-transform ${
                              expandedGroups.includes(row.__groupKey)
                                ? "transform rotate-90"
                                : ""
                            }`}
                          />
                          <span className="font-medium">
                            {row.__groupField}: {row.__groupKey} (
                            {row.__itemCount} transactions)
                          </span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-2">
                            <Table>
                              <TableBody>
                                {row.__items.map(
                                  (
                                    item: { [x: string]: any },
                                    itemIndex: any
                                  ) => (
                                    <TableRow key={`${rowIndex}-${itemIndex}`}>
                                      {autoDetectedColumns.map((column) => {
                                        const type =
                                          column.type ||
                                          detectDataType(item[column.key]);
                                        return (
                                          <TableCell
                                            key={`${rowIndex}-${itemIndex}-${column.key}`}
                                          >
                                            {renderCellValue(
                                              item,
                                              column.key,
                                              type,
                                              column
                                            )}
                                          </TableCell>
                                        );
                                      })}
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={rowIndex}>
                    {autoDetectedColumns.map((column) => {
                      const type =
                        column.type || detectDataType(row[column.key]);
                      return (
                        <TableCell key={`${rowIndex}-${column.key}`}>
                          {renderCellValue(row, column.key, type, column)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              value={currentPageSize.toString()}
              onValueChange={(value) => {
                const newPageSize = Number.parseInt(value);
                setCurrentPageSize(newPageSize);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder={currentPageSize} />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * currentPageSize + 1} to{" "}
            {Math.min(
              currentPage * currentPageSize,
              sortedAndGroupedData.length
            )}{" "}
            of {sortedAndGroupedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Select
              value={currentPage.toString()}
              onValueChange={(value) =>
                handlePageChange(Number.parseInt(value))
              }
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder={currentPage} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: totalPages }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-sm text-muted-foreground">
              of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
